const connection = require("../../modal/dbConnect")

const getUser = async (req, res) => {

  try {
    const query = "SELECT uid, uname, age from user";

    connection.query(query, (error, result) => {
      if (error) {
        console.error("Database Error:", error.sqlMessage);
        return res.status(500).json({ status: 500, message: "Database error", error: error.sqlMessage });
      }
      res.status(200).json({ status: 200, data: result });
    });
  } catch (err) {
    console.error("Unexpected Error:", err.message);
    res.status(500).json({ status: 500, message: "Unexpected server error", error: err.message });
  }
};

const addUser = async (req, res) => {
  const { uid, uname, age } = req.body;

  const data = { uid, uname, age };
  const query = "INSERT INTO user SET ?";

  try {
    connection.query(query, data, (error, result) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          message: "Database Error",
          error: error.sqlMessage
        });
      }

      return res.status(201).json({
        status: 201,
        message: "User added successfully",
        data: {
          insertId: result.insertId,
          affectedRows: result.affectedRows
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Unexpected server error",
      error: err.message
    });
  }
};

const dltUser = async (req, res) => {
  const { uid } = req.params;

  if (!uid) {
    return res.status(400).json({
      status: 400,
      message: "uid is required"
    });
  }

  const query = "DELETE FROM user WHERE uid = ?";

  try {
    connection.query(query, [uid], (error, result) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          message: "Database Error",
          error: error.sqlMessage
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found"
        });
      }

      return res.status(200).json({
        status: 200,
        message: "User deleted successfully",
        data: {
          affectedRows: result.affectedRows
        }
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Unexpected server error",
      error: err.message
    });
  }
};

const userPut = async (req, res) => {
  const { uname, age } = req.body;
  const { uid } = req.params;

  if (!uname || !age) {
    return res.status(400).json({
      status: 400,
      message: "uname and age are required"
    });
  }

  const query = "UPDATE `user` SET uname = ?, age = ? WHERE uid = ?";
  const data = [uname, age, uid];

  try {
    connection.query(query, data, (error, result) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          message: "Database Error",
          error: error.sqlMessage
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found"
        });
      }

      return res.status(200).json({
        status: 200,
        message: "User updated successfully (PUT)"
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Unexpected server error",
      error: err.message
    });
  }
};


const userPatch = async (req, res) => {
  const { uname } = req.body;
  const { uid } = req.params;

  if (!uname) {
    return res.status(400).json({
      status: 400,
      message: "Nothing to update"
    });
  }

  const query = "UPDATE user SET uname = ? WHERE uid = ?";
  const data = [uname, uid];

  try {
    connection.query(query, data, (error, result) => {
      if (error) {
        return res.status(500).json({
          status: 500,
          message: "Database Error",
          error: error.sqlMessage
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          status: 404,
          message: "User not found or no change"
        });
      }

      return res.status(200).json({
        status: 200,
        message: "User updated successfully (PATCH)"
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Unexpected server error",
      error: err.message
    });
  }
};

module.exports = { getUser, addUser, dltUser, userPatch, userPut }