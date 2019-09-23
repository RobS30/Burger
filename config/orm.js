// Import MySQL connection.
var connection = require("../config/connection.js");

var burgerORM = {
addBurger: function(table_name, columns, values, cb) {
    var sql = "INSERT INTO " + table_name;

    sql += " (";
    sql += columns.toString();
    sql += ") ";
    sql += "VALUES (";
    // printQuestionMarks is a helper function creates question marks for mysql queries
    sql += printQuestionMarks(values.length);
    sql += ") ";
    var query = connection.query(sql, values, function(
      err,
      result
    ) {
      if (err) throw err;

      cb(result);
    });
  },

selectAllBurgers: function(column_name, table_name, where_column, some_value, cb) {
    var sql_array = [];
    sql_array.push(column_name);
    sql_array.push(table_name);
    var sql = "SELECT ?? FROM ??";
    if (where_column) {
      sql += " WHERE ?? = ?";
      sql_array.push(where_column);
      sql_array.push(some_value);
    }
    connection.query(sql, sql_array, function(err, result) {
      if (err) throw err;

      cb(result);
    });
  },

updateBurger: function(table, objColValues, condition, cb) {
    var sql = "UPDATE " + table;
    sql += " SET ";
    sql += objToSql(objColValues);
    sql += " WHERE ";
    sql += condition;
    connection.query(sql, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

deleteBurger: function(table_name, some_column, some_value, cb) {
    var sql = "DELETE FROM ?? WHERE ?? = ?";
    connection.query(sql, [table_name, some_column, some_value], function (
        err, result)
        {
            if (err) throw err;
            cb (result);
        });
    }
  };

// Helper function to convert object key/value pairs to SQL syntax
// not needed for now
// objToSql(ob) 


// Export the orm object for the model (burger.js).
module.exports = burgerORM;
