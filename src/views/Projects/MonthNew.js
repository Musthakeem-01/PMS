import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
// import { config } from "../../../config";
// import CommonAPISelect from "../../../CommonAPISelect";
// import CommonAPISave from "../../../CommonAPISave";
import EditIcon from '@mui/icons-material/Edit';
import '../../assets/css/monthnew.css'

import moment from 'moment';
import {
  format, subDays, subWeeks, subMonths, subYears, addDays,
  startOfWeek, addWeeks, addMonths, addYears, parse, isSameMonth, startOfMonth, endOfMonth,
  endOfWeek, isSameDay
} from 'date-fns'

import DeleteOutline from '@mui/icons-material/DeleteOutline';
// import setDefaultOptions from 'date-fns/setDefaultOptions/index';
const { forwardRef, useRef, useImperativeHandle, useContext } = React;



const MonthCalendar = forwardRef((props, ref) => {

  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [currentYear, setCurrentYear] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = React.useState(false);
  const [textevent, settextevent] = useState('');
  const [dayState, setDayState] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [secPoP, setsecPoP] = useState([])
  const [ThirdPop, setThirdPop] = useState('')
  const [anchorElEveList, setAnchorElEveList] = useState(null);
  const [PrevData, setPrevData] = useState([]);
  const [DeleteData,setDeleteData] = useState([]);
  const [DeleteName,setDeleteName] = useState([]);
  const [ColorCode,setColorCode] = useState("#5A8DEE");
  const [eventid,seteventid] = useState(0);

  useEffect(() => {
    
    seteventid(0);
  }, [])

  useImperativeHandle(ref, () => ({

    Prev: () => {
      prevMonth();
    },
    Next: () => {
      nextMonth();
    }

  }));

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))

  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))

  };
  const prevYear = () => {
    setCurrentYear(subYears(currentYear,1))
  }
  const nextYear = () => {
    setCurrentYear(addYears(currentYear,1))
  }

  function renderDays() {
    const dateFormat = "EEE";
    const days = [];

    let startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center daynames" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row h-8 items-end">{days}</div>;
  }

  const editevent = (event) => {
    seteventid(event.ProjectCalanIDPK ? event.ProjectCalanIDPK : 0);
    settextevent(event.ProCalanNarration);
    setColorCode(event.ProCalanColor);

    const dateTimeParts = event.ProjectCalanDateTime.split(" ");
    const dateParts = dateTimeParts[0].split("-");
    const timeParts = dateTimeParts[1].split(":");
    const year = parseInt(dateParts[2], 10);
    const month = parseInt(dateParts[1], 10) - 1; // Months are zero-based
    const day = parseInt(dateParts[0], 10);
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    
    const selectedDate = new Date(year, month, day, hours, minutes, seconds);
    setSelectedDate(selectedDate);
    setOpen(true);

  }

  const eventBinding = (day, monthStart) => {
    const FilrMon = dayState.filter(m => m.ProCalanMonth == format(currentMonth, "MM"));
    const listday = format(day, 'd');
    const dayfilt = dayState.filter(n => n.ProCalanDay == listday);
    if (FilrMon.length == 0) { return false }
    if (isSameMonth(day, monthStart)) {
   if (dayfilt.length > 0) {

          if (dayfilt.length > 3) {

            return dayfilt.map((en, i) => {

              if (i < 2) {

                return (<div key={i} className='tagday1' style={{background:en.ProCalanColor}} onClick={(event) => {handleClickPOP(event, [en], listday);setDeleteData(dayfilt);setPrevData([]);}} >{en.ProCalanNarration}<EditIcon style={{position:'absolute',right:'5%',fontSize:'20px'}} onClick={() => editevent(en) }></EditIcon></div>)
              }
              else if (i === 3) {
                return (<div key={i} className='tagday1more' onClick={(event) => {handleClickPOP(event, dayfilt, listday);setDeleteData(dayfilt);}} >+ {dayfilt.length -2 + ' more'}<EditIcon style={{position:'absolute',right:'5%',fontSize:'20px'}} onClick={() => editevent(en) }></EditIcon></div>)
              }

            })

          } else {

            return dayfilt.map((en, i) => (<div key={i} className='tagday1' style={{background:en.ProCalanColor}} onClick={(event) => {handleClickPOP(event, [en], listday);setDeleteData(dayfilt);setPrevData([])}}>{en.ProCalanNarration}<EditIcon style={{position:'absolute',right:'5%',fontSize:'20px'}} onClick={() => editevent(en)}></EditIcon></div>))

          }
        }

        

       
    }


  }


  function renderCells() {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${!isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, selectedDate) ? "selectednull" : ""
              }`}
            key={day}
            onClick={() => { onDateClick(cloneDay, formattedDate) }}
          >
            <span className={`number1 ${isSameDay(day, selectedDate) ? "selectdt" : ""}`}>{formattedDate}</span>
            <div className="calendarTextCenter">
              {eventBinding(cloneDay, monthStart)}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  const onDateClick = (day) => {
    const listday = format(day, 'd');
    const dayfilt = dayState.filter(n => n.day == listday);
    settextevent("")
    setPrevData(dayfilt);
    setSelectedDate(day);
    setOpen(true);
  };

  const slDate = format(selectedDate, "d");
  const slYear = format(selectedDate, "YYY");
  const year = selectedDate.getFullYear();
const month = String(selectedDate.getMonth() + 1).padStart(2, '0'); // Month is zero-based
const day = String(selectedDate.getDate()).padStart(2, '0');
const hours = String(selectedDate.getHours()).padStart(2, '0');
const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
const seconds = String(selectedDate.getSeconds()).padStart(2, '0')
const datetime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;


  const handleClose = (params) => {
    // 
    setOpen(false);
    seteventid(0);
   
   
    props.loading(false);
  }

  
  const handleClickPOP = (event, params, day) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    const result = params.map(function (el) {
      let o = Object.assign({}, el);
      o.day = day;
      return o;
    });
    setsecPoP(result)

  }
  const handleClosepop = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const openEveList = Boolean(anchorElEveList);
  const idEveList = openEveList ? 'simple-popover' : undefined;

  const handleClickEveList = (event, params) => {
    event.stopPropagation();
    setAnchorElEveList(event.currentTarget);
    // setPrevData(dayfilt);
    settextevent(params.name);
    setColorCode(params.color);


  }

  const handleCloseEveList = () => {
    setAnchorElEveList(null);
  };

 

  function ColorFunc(e,color){
    setColorCode(color);
  }

  return (
    <div className="block relative w-full bg-white  calendar rounded-lg	"  >

      <div>

        {renderDays()}
        {renderCells()}
      </div>


      <Dialog onClose={handleClose} className="displayFlex" aria-labelledby="customized-dialog-title" open={open} >
      
        <DialogContent dividers style={{ minWidth: '500px' }}>
          <TextField
            autoFocus={true}
            margin="dense"
            id="name"
            label="Events"
            type="text"
            value={textevent}
            autoComplete={false}
            onChange={(e) => settextevent(e.target.value)}
            fullWidth
          />
          <div className="color-box-div"> 
              <div className={"color-box color-box-blue " + (ColorCode === "#5A8DEE" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#5A8DEE")}}>

              </div>  
              <div className={"color-box color-box-green " + (ColorCode === "#39DA8A" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#39DA8A")}}>

              </div> 
              <div className={"color-box color-box-red " + (ColorCode === "#FF5B5C" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#FF5B5C")}}>

              </div> 
              <div className={"color-box color-box-skyblue " + (ColorCode === "#81ecec" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#81ecec")}}>
                  
              </div> 
              <div className={"color-box color-box-orange " + (ColorCode === "#272E48" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#272E48")}}>

              </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('save')} color="primary">
          {`${eventid ? 'Update' : 'Save'}`}
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Popover
        id={id}
        open={openPop}
        anchorEl={anchorEl}
        onClose={handleClosepop}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
      >
        <div style={{ padding: '0.6rem' }}>
          <div>
            <div style={{ textAlign: 'center' }}>
 
              <div style={{ float: 'right' }}><CloseIcon style={{ width: '17px', cursor: 'pointer' }} onClick={handleClosepop} /></div>
            </div>

            <div className='subTitpopDate'> {secPoP.length > 0 && secPoP[0].day}</div>

          </div>


          <div style={{ width: '210px' }}>
            <div >
              {
                secPoP.length > 0 &&

                secPoP.map((ev, i) => {
                  return (<div key={i} className='tagday1' style={{background:ev.color}} onClick={(e) => {handleClickEveList(e, ev);setDeleteName(ev.name);setPrevData([]);}}>{ev.name}</div>);

                })

              }
            </div>

          </div>

        </div>

      </Popover> */}

      <Popover
        id={idEveList}
        open={openEveList}
        anchorEl={anchorElEveList}
        onClose={handleCloseEveList}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <div style={{ padding: '0.6rem', width: '20rem' }}>
          <div className="displayFlex">
            {/* <p>Edit Event</p> */}
            <div style={{ marginLeft: 'auto' }}><CloseIcon style={{ width: '17px' }} onClick={handleCloseEveList} /></div>
          </div>

          <div style={{ display: 'grid', padding: '1.5rem 1rem 1rem 1.5rem' }}>
            {/* <div>
            <div className='T7dzVe'> </div>
            </div>*/}
          {/* <div style={{paddingLeft:'1rem'}}>{textevent}</div> */}

            <TextField
              autoFocus={true}
              margin="dense"
              id="name"
              label="Events"
              type="text"
              value={textevent}
              autoComplete={false}
              onChange={(e) => settextevent(e.target.value)}
              fullWidth
            /> 
            <div className="color-box-div"> 
              <div className={"color-box color-box-blue " + (ColorCode === "#5A8DEE" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#5A8DEE")}}>

              </div>  
              <div className={"color-box color-box-green " + (ColorCode === "#39DA8A" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#39DA8A")}}>

              </div> 
              <div className={"color-box color-box-red " + (ColorCode === "#FF5B5C" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#FF5B5C")}}>

              </div> 
              <div className={"color-box color-box-skyblue " + (ColorCode === "#81ecec" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#81ecec")}}>
                  
              </div> 
              <div className={"color-box color-box-orange " + (ColorCode === "#272E48" ? "Act-clr-btn" : "")} onClick={(e) => {ColorFunc(e,"#272E48")}}>

              </div>
            </div>
            <Button onClick={() => handleClose('save')} color="primary">
              Save
            </Button> 
          </div>
            <DeleteOutline style={{color:"red",cursor: 'pointer'}} onClick={(e) => { }} />
        </div>

      </Popover>


    </div>
  );

})

export default MonthCalendar;
