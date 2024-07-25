const db = require("../models/db");


//admin 
exports.getUsers = async (req, res, next) => {
  try {
    const users = await db.user.findMany();
    res.json({ users });
    next();
  } catch (err) {
    next(err);
  }
};

exports.getTypes = async (req, res, next) => {
  try {
    const types = await db.type_Table.findMany({});
    console.log(types);
    res.json({ types });
    // next();
  } catch (err) {
    next(err);
  }
};

exports.getTables = async (req, res, next) => {
  try {
    const tables = await db.table.findMany({
      include: {
        type_table: true,
      },
    });
    res.json({ tables });
    next();
  } catch (err) {
    next(err);
  }
};

exports.getBookings = async (req, res, next) => {
  try {
    const bookings = await db.booking.findMany({
      include: {
        table: {
          include: {
            type_table: true,
          },
        },
        user: true,
      },
    });
    res.json({ bookings });
    next();
  } catch (err) {
    next(err);
  }
};

exports.updateStatusBooking = async (req, res, next) => {
  console.log(req.body)
  const { booking_id } = req.params;
  const { status_booking } = req.body;
  try {
    const rs = await db.booking.update({
      data: {
        status_booking,
      },
      where: { booking_id: Number(booking_id) },
    });
    res.json({ message: "UPDETE", result: rs });
  } catch (err) {
    next(err);
    console.log(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  const { user_id } = req.params;
  try {
    const rs = await db.user.delete({ where: { user_id: +user_id } });
    res.json({ msg: "Delete Ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deleteTable = async (req, res, next) => {
  const { table_id } = req.params;
  try {
    const rs = await db.table.delete({ where: { table_id: +table_id } });
    res.json({ msg: "Delete Ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.deleteType = async (req, res, next) => {
  const { type_id } = req.params;
  try {
    const rs = await db.type_Table.delete({ where: { type_id: +type_id } });
    res.json({ msg: "Delete Ok", result: rs });
  } catch (err) {
    next(err);
  }
};

exports.createTables = async (req, res, next) => {
  try {
    const { table_img, table_name, table_status, table_price, type_name } = req.body;
    if (
      !table_name || typeof table_name !== 'string' ||
      !table_status || typeof table_status !== 'string' ||
      isNaN(Number(table_price)) || isNaN(Number(type_name))
    ) {
      return res.status(400).json({ msg: "Invalid input data" });
    }

    const sanitizedTableName = table_name.trim();
    const sanitizedTableStatus = table_status.trim();
    const sanitizedTablePrice = Number(table_price);
    const sanitizedTypeName = Number(type_name);

    const existingTable = await db.table.findFirst({
      where: { table_name: sanitizedTableName },
    });

    if (existingTable) {
      return res.status(400).json({ msg: "Table name already exists" });
    }

    const newTable = await db.table.create({
      data: {
        table_img,
        table_name: sanitizedTableName,
        table_status: sanitizedTableStatus,
        table_price: sanitizedTablePrice,
        typeId: sanitizedTypeName,
      },
    });

    res.status(201).json({ msg: "Table created successfully", table: newTable });
  } catch (error) {
    console.error("Error creating table:", error.message);
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
    next(error);
  }
};

exports.checkTableNameUnique = async (req, res) => {
  try {
    const { name } = req.query;


    if (!name || typeof name !== 'string') {
      console.log("Invalid input data:", { name });
      return res.status(400).json({ msg: "Invalid input data" });
    }

    const sanitizedName = name.trim();
    console.log("Sanitized table name:", sanitizedName); 

    const existingTable = await db.table.findFirst({
      where: { table_name: sanitizedName },
    });

    console.log("Existing table record:", existingTable); 

    res.status(200).json({ isUnique: !existingTable });
  } catch (error) {
    console.error("Error checking table name uniqueness:", error); 
    res.status(500).json({ msg: "Internal Server Error", error: error.message });
  }
};


exports.createType = async (req, res, next) => {
  try {
    const { type_name } = req.body;

    if (!type_name || typeof type_name !== 'string') {
      return res.status(400).json({ msg: "Type name is required and must be a string" });
    }

    const existingType = await db.type_Table.findFirst({
      where: {
        type_name: type_name
      }
    });
    
    if (existingType) {
      return res.status(400).json({ msg: "Type name already exists" });
    }

    const newType = await db.type_Table.create({
      data: { type_name },
    });

    res.status(201).json({ msg: "Type created successfully", type: newType });
  } catch (error) {
    console.error("Error creating type:", error);

    if (error.name === "ValidationError") {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }

    next(error);
  }
};


exports.checkTypeExists = async (req, res, next) => {
  try {
    const { type_name } = req.params;

    if (!type_name || typeof type_name !== 'string') {
      return res.status(400).json({ msg: "Type name is required and must be a string" });
    }

    const existingType = await db.type_Table.findFirst({
      where: { type_name }
    });

    res.status(200).json({ exists: !!existingType });
  } catch (error) {
    console.error("Error checking type existence:", error);

    if (error.name === "ValidationError") {
      res.status(400).json({ msg: error.message });
    } else {
      res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }

    next(error);
  }
};




exports.updateType = async (req, res, next) => {
  const { type_id } = req.params;
  const { type_name } = req.body;
  console.log(req.params);
  try {
    const rs = await db.type_Table.update({
      data: {
        type_name,
      },
      where: { type_id: Number(type_id) },
    });
    res.json({ message: "UPDETE", result: rs });
  } catch (err) {
    next(err);
    console.log(err);
  }
};


exports.updateTable = async (req, res, next) => {
  const { table_id } = req.params;
  const { table_img, table_name, table_status, table_price, type_name } = req.body;

  try {
    const typeRecord = await db.type_Table.findFirst({
      where: { type_name: type_name }
    });

    if (!typeRecord) {
      return res.status(400).json({ message: "Type not found" });
    }

    const type_id = typeRecord.type_id;

    const rs = await db.table.update({
      data: {
        table_img,
        table_name,
        table_status,
        table_price,
        typeId: type_id, 
      },
      where: { table_id: Number(table_id) },
    });

    res.json({ message: "UPDATE", result: rs });
  } catch (err) {
    console.error("Error updating table:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};

exports.updateStatusTable = async (req, res, next) => {
  console.log(req.body)
  const { table_id } = req.params;
  const { table_status } = req.body;
  try {
    const rs = await db.table.update({
      data: {
        table_status,
      },
      where: { table_id: Number(table_id) },
    });
    res.json({ message: "UPDETE", result: rs });
  } catch (err) {
    next(err);
    console.log(err);
  }
};


// exports.deleteBooking = async (req, res, next) => {
//   const { booking_id } = req.params;
//   try {
//     const rs = await db.booking.delete({ where: { booking_id: +booking_id } });
//     res.json({ msg: "Delete Ok", result: rs });
//   } catch (err) {
//     next(err);
//   }
// };

