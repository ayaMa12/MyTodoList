import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Misstoes from "./misstoes";
import { v4 as uuidv4 } from "uuid";
import InputAdd from "./input&add";
import { useContext, useEffect, useState } from "react";
import Divider from "@mui/material/Divider";
import { dataContext } from "./context/context";
//Dialog
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
 //===========================
// create them direction
 
//===========================
export default function Mycard() {
  const list_Misstoes = useContext(dataContext);
  const [data, setData] = useState(list_Misstoes);
  const [Newdata, setNewData] = useState({ title: "", description: "" });
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [EditId, setEditId] = useState(null);
  const taskToDelete = data.find((item) => item.id === deleteId);

  //Dialog functions
  // open and close dialog
  // delete dialog
  useEffect(() => {
    const savedTasks = localStorage.getItem("task");
    if (savedTasks) {
      setData(JSON.parse(savedTasks));
    }
  }, []);

  const handleCloseDelete = () => {
    setOpen(false);
  };
  const handleOpenDelete = () => {
    setOpen(true);
  };
  const handleCloseEdit = () => {
    setOpenEdit(false);
  };
  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  //    map من خلال مصفوفة  بواسطة ال misstoes هنا هبعت ال
  let new_List = data.map((item) => (
    <Misstoes
      key={item.id}
      item={item}
      Compeleted={Compeleted}
      requestُEdit={requestُEdit}
      handleOpenEdit={handleOpenEdit}
      requestDelete={requestDelete}
    />
  ));
  //function setInput value from textfail
  function inputHandel(value) {
    setInput(value);
  }
  //=====================
  //function delete
  //  function handelDelete(itemid) {
  //   if (window.confirm("هل أنت متأكد من الحذف؟")) {
  //     const NewData = data.filter(item => item.id !== itemid);
  //     setData(NewData);
  //   }
  // }
  function requestDelete(id) {
    setDeleteId(id);
    handleOpenDelete();
  }
  function handelDelete(deleteId) {
    const NewData = data.filter((item) => item.id !== deleteId);
    setData(NewData);
    localStorage.setItem("task", JSON.stringify(NewData));

    handleCloseDelete();
    setDeleteId(null);
  }

  //=========================
  //function edite
  function requestُEdit(id) {
    let back_data = data.find((item) => item.id === id);
    if (back_data) {
      setNewData({
        title: back_data.title,
        description: back_data.description,
      });
    }
    setEditId(id);
    handleOpenEdit();
  }
 
  function handelEdit(EditId) {
    const updatedData = data.map((item) => {
      if (item.id === EditId) {
        return {
          ...item,
          title: Newdata.title,
          description: Newdata.description,
        };
      }
      return item;
    });

    setData(updatedData);
    localStorage.setItem("task", JSON.stringify(updatedData));

    handleCloseEdit();
    setEditId(null);
  }

  //=================

  function Compeleted(itemid) {
    let comp = data.map((co) => {
      if (itemid === co.id) {
        co.isCompleted = !co.isCompleted;
      }
      return co;
    });
    setData((c) => (c = comp));
    localStorage.setItem("task", JSON.stringify(comp));

    // عملت كدا للتحديث المتتالي
  }
  //function add
  function Add() {
    if (input) {
      let newData = {
        id: uuidv4(),
        title: input.charAt(0).toUpperCase() + input.substring(1).toLowerCase(),
        description: ` تفاصيل ${input}`,
        isCompleted: false,
      };
      let Add_data = [...data, newData];
      setData(Add_data);
      localStorage.setItem("task", JSON.stringify(Add_data));

      setInput("");
    } else {
      alert("من فضلك ادخل البيانات");
      // handleOpenEdit();
    }
  }
  //=========================

  return (
    <>
      <Card>
   
        <Typography variant="h1" sx={{ textAlign: "center"  }}>
          {" "}
          مهامي <Divider />
          {/* equal <hr/> */}
        </Typography>
       
        <div
          style={{
            textAlign: "center",
            margin: "40px",
          }}
        >
          <ButtonGroup variant="outlined" color="error">
            <Button>غير منجز</Button>
            <Button>منجز</Button>
            <Button>الكل</Button>
          </ButtonGroup>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            margin: "30px 10px",
          }}
        >
          {new_List}
          <InputAdd input={input} inputHandel={inputHandel} Add={Add} />
        </div>
      </Card>
      {/*Dialog delete  */}
      <Dialog
        sx={{ direction: "rtl" }}
        open={open}
        onClose={handleCloseDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"عنوان المهمة "}
        </DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <DialogContentText id="alert-dialog-description">
            {/* هل تريد حذف "{taskToDelete.title}" */}
            {taskToDelete ? ` هل تريد حذف ${taskToDelete.title}` : ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete}>غير موافق</Button>
          <Button onClick={() => handelDelete(deleteId)}>موافق</Button>
        </DialogActions>
      </Dialog>
      {/* ============================================ */}
      {/* Dialog Edit */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        sx={{ direction: "rtl" }}
      >
        <DialogTitle sx={{ textAlign: "center" }}>
          هل تريد تعديل البيانات
        </DialogTitle>
        <DialogContent
          sx={{ width: 500, display: "flex", flexDirection: "column", gap: 2 }}
        >
          <DialogContentText>تغير العنوان </DialogContentText>

          <TextField
            sx={{ width: "100%" }}
            value={Newdata.title}
            onChange={(e) => {
              setNewData({ ...Newdata, title: e.target.value });
            }}
            id="outlined-basic"
            label="العنوان"
            variant="outlined"
          />
           <DialogContentText 
           
          >تغير الوصف </DialogContentText>
       
            <TextField
              id="outlined-basic"
              label="الوصف"
              variant="outlined"
              sx={{ width: "100% "}}
              value={Newdata.description}
              onChange={(e) => {
                setNewData({ ...Newdata, description: e.target.value });
              }}
            />
         </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>لا</Button>
          <Button onClick={() => handelEdit(EditId)}>نعم</Button>
        </DialogActions>
      </Dialog>
      {/* ======================================== */}
    </>
  );
}
