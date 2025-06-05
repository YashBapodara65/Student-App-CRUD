import React, { useEffect, useState } from "react";
import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  TextField,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

const TableLayout = ({ records, rows, tableData, tableActions }) => {
  const [studentData, setStudentData] = useState([]);
  const [updateStudentData, setUpdateStudentData] = useState([]);
  const [searchData, setSearchData] = useState("");
  const [totalRecords, setTotalRecords] = useState(null);

  // get records with dynamic
  useEffect(() => {
    if (records) {
      setStudentData(records);
    }
  }, [records]);

  // call when searchData and studentData is updated
  useEffect(() => {
    const filterData = studentData.filter((item) => {
      const search = searchData.toLowerCase();
      return (
        item.name.toLowerCase().includes(search) ||
        item.class.toLowerCase().includes(search) ||
        item.grno.toLowerCase().includes(search) ||
        item.rollno.toLowerCase().includes(search)
      );
    });

    setTotalRecords(studentData.length);
    setUpdateStudentData(filterData);
  }, [searchData, studentData]);

  // pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = updateStudentData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(updateStudentData.length / itemsPerPage);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          alignItems: "center",
          flexDirection: "column",
          padding: "10px 20px",
        }}
      >
        <div
          style={{
            width: "90%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <TextField
              id="outlined-search"
              onChange={(e) => setSearchData(e.target.value)}
              value={searchData}
              label="Search field"
              type="search"
            />
            <div>
              <h2 style={{ color: "blue", fontFamily: "sans-serif" }}>
                Total Students : {totalRecords}
              </h2>
            </div>
          </div>
          {updateStudentData?.length == 0 ? (
            <Link to={"/form"}>
              <Button variant="contained">Add Student</Button>
            </Link>
          ) : (
            ""
          )}
        </div>
        <TableContainer
          component={Paper}
          style={{ marginTop: "50px", width: "90%" }}
        >
          <Table sx={{ width: "100%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {rows?.map((fieldItem, index) => {
                  return (
                    <TableCell
                      colSpan={fieldItem.col}
                      key={index}
                      align="center"
                    >
                      {fieldItem.name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems?.length > 0 ? (
                currentItems?.map((item, index) => {
                  return (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" align="center" scope="row">
                        {indexOfFirstItem + index + 1}
                      </TableCell>
                      {tableData.map((col, idx) => {
                        return (
                          <TableCell key={idx} align="center">
                            {item[col.name]}
                          </TableCell>
                        );
                      })}
                      {tableActions.map((action,idx) => {
                        let Icon = action.icon
                        return (
                          <TableCell key={idx} align="center">
                            <Tooltip title={action.name}>
                              <IconButton>
                                <Icon
                                  onClick={() => action.action(item)}
                                />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    style={{
                      textAlign: "center",
                      fontSize: "1.2rem",
                      padding: "20px 0px",
                    }}
                  >
                    No available data
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack spacing={2} style={{ marginTop: "30px" }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </Stack>
      </div>
    </>
  );
};

export default TableLayout;
