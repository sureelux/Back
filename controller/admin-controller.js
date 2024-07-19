const db = require("../models/db");

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

exports.getBookingUser = async (req, res, next) => {
  try {
    const BookingUser = await db.booking.findMany({
      include: {
        table: {
          include: {
            type_table: true,
          },
        },
        user: true,
      },
    });
    res.json({ BookingUser });
    next();
  } catch (err) {
    next(err);
  }
};

// exports.gettypetable = async

exports.getTypesUser = async (req, res, next) => {
  try {
    const types = await db.type_Table.findMany({});
    console.log(types);
    res.json({ types });
    // next();
  } catch (err) {
    next(err);
  }
};



// exports.getPayments = async (req, res, next) => {
//     try {
//         const payments = await db.payment.findMany();
//         res.json({ payments });
//         next();
//     } catch (err) {
//         next(err);
//     }
// }

// exports.getReceipts = async (req, res, next) => {
//     try {
//         const receipts = await db.receipt.findMany({
//           include:  {
//             payment: {
//               include: {
//                 booking: {
//                   include: {
//                     table: true
//                   }
//                 }
//               }
//             },
//             user: true
//           }
//         });
//         res.json({ receipts });
//         next();
//     } catch (err) {
//         next(err);
//     }
// }

// exports.getReceiptsByID = async (req, res, next) => {
//     try {
//       const { id } = req.params;
//         const receipts = await db.receipt.findFirst({
//           where: {
//             receip_id: +id
//           },
//           include:  {
//             payment: {
//               include: {
//                 booking: {
//                   include: {
//                     table: true
//                   }
//                 }
//               }
//             },
//             user: true
//           }
//         });
//         res.json({ receipts });
//         next();
//     } catch (err) {
//         next(err);
//     }
// }

exports.getTableByID = async (req, res, next) => {
  try {
    // const { id } = req.params;
    // const tables = await db.table.findFirst({
    //   where: {
    //     table_id: Number(id)
    //   },
    // });
    const tables = await db.table.findMany({
      include: {
        type_table: true,
      },
    });
    res.json({ tables });
  } catch (err) {
    next(err);
  }
};

exports.getTBYID = async (req, res, next) => {
  try {
    const { id } = req.params;
    const tables = await db.table.findFirst({
      where: {
        table_id: Number(id),
      },
      include: {
        type_table: true
      }
    });
    res.json({ tables });
  } catch (err) {
    next(err);
  }
};

// create
exports.createTables = async (req, res, next) => {
  try {
    const { table_img, table_name, table_status, table_price, type_name } =
      req.body;
    console.log(req.body);

    const Tables = await db.table.create({
      data: {
        table_img,
        table_name,
        table_status,
        table_price: Number(table_price),
        typeId: Number(type_name),
      },
    });

    res.json({ msg: "Table created successfully", Tables });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.createType = async (req, res, next) => {
  try {
    const { type } = req.body;
    const cTpye = await db.type_Table.create({
      data: {
        type_name: type,
      },
    });
    res.json({ cTpye });
  } catch (err) {
    next(err);
  }
};

// exports.createBookings = async (req, res, next) => {
//   const { booking_datatime, table_id, user_id } = req.body;
//   // const user_id = req.user.user_id
//   try {
//     const dateTime = new Date(booking_datatime);
//     const booking = await db.booking.create({
//       data: {
//         booking_datatime: dateTime,
//         table: {
//           connect: {
//             table_id: +table_id,
//           },
//         },
//         user: {
//           connect: {
//             user_id,
//           },
//         },
//       },
//     });
//     res.json({ booking });
//   } catch (err) {
//     next(err);
//     console.log(err);
//   }
// };

// exports.createPayment = async (req, res, next) => {
//   try {
//     const { payment_method, payment_img, booking_id } = req.body;
//     const payment = await db.payment.create({
//       data: {
//         payment_method,
//         payment_img,
//         booking: {
//           connect: {
//             booking_id: +booking_id,
//           }
//         }
//       }
//     })
//     res.json({ payment })
//   }catch(err){
//     console.log(err)
//     next(err)
//   }
// }

// exports.createReceipts= async (req, res, next) => {
//   const { receip_datatime, payment_id, user_id } = req.body;
//   // const user_id = req.user.user_id
//   console.log(receip_datatime)
//   try {
//       const receipt = await db.receipt.create({
//           data: {
//               receip_datatime,
//               payment: {
//                   connect: {
//                       payment_id,
//                   }
//               },
//               user: {
//                   connect: {
//                       user_id,
//                   }
//               },
//           }
//       })
//       res.json({ receipt })
//   }catch(err){
//       next(err)
//       console.log(err)
//   }
// }

// delete
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

// exports.deleteBooking = async (req, res, next) => {
//   const { booking_id } = req.params;
//   try {
//     const rs = await db.booking.delete({ where: { booking_id: +booking_id } });
//     res.json({ msg: "Delete Ok", result: rs });
//   } catch (err) {
//     next(err);
//   }
// };


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
  const { table_img, table_name, table_status, table_price, type_id } = req.body;

  try {
    const rs = await db.table.update({
      data: {
        table_img,
        table_name,
        table_status,
        table_price,
        type_id,
      },
      where: { table_id: Number(table_id) },
    });
    res.json({ message: "UPDETE", result: rs });
  } catch (err) {
    next(err);
    console.log(err);
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

exports.TypeTableUser = async (req, res, next) => {
  try {
    const { type } = req.query; // Get type from query parameters
    const dTpye = await db.table.findMany({
      where: {
        type_table: {
          type_name: type
        }
      },
      include: {
        type_table: true
      }
    });
    res.json({ dTpye, type });
  } catch (err) {
    next(err);
  }
};


