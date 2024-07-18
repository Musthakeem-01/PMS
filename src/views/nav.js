import React, { lazy ,useRef, useState, Component } from "react";
import { BsArrowLeftShort, BsChevronDown, BsFileImageFill, BsPerson, BsReverseLayoutTextSidebarReverse, BsSearch } from "react-icons/bs";
import '../index.css';
import { AiFillEnvironment, AiOutlineBarChart, AiOutlineFileText, AiOutlineLogout, AiOutlineMail  } from "react-icons/ai";
import { RiDashboardFill } from "react-icons/ri";
import { GoChevronLeft } from "react-icons/go";

// import Header from './views/header/header';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import getIconComponent from '../components/utils/getIconComponent';
import HomeIcon from '@mui/icons-material/Home';
import ReactDOM from 'react-dom/client';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Notification from '../components/utils/Notification';
import Loading from '../components/utils/loading';

import { Icon, Tooltip } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
var tabArr = [];

function NavMenu(props) {
  const [open, setOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const SideBarRef = useRef(null);
  const MainContentRef = useRef(null);
  const [TabArr, setTabArr] = useState(tabArr);
  const [loading, setLoading] = useState(false);
  const [Message, setMessage] = useState({ open: false, color: '', message: [] });
  const [selected,setSelected]=useState(false);
  const [openSlideMenu, setopenSlideMenu] = useState('');
  const [expandMenu, setExpandMenu] = useState(false); 
  const [SlideBgColor,setSlideBgColor] = useState(0);
  const [SideBarIcon,setSideBarIcon]=useState('');
  const [NewTabData,setNewTabData]=useState({});
  const [CollapseOpen, setCollapseOpen] = useState(false); 
  const [expanded, setExpanded] = useState(false);
  const [Items, setItems] = useState([]);


  const Menus = [
    {id:'1',title : "Dashboard",menuRef:''},
    {id:'2',title : "Projects", icon: <AiOutlineFileText />,menuRef:'1'},
    // {id:'3',title : "Media", spacing: true, icon: <BsFileImageFill />},
    // { id:'4',
    //   title:"Sub Projects",
    //   icon: <BsReverseLayoutTextSidebarReverse />,
    //   submenu: true,
    //   menuRef:'',
    //   submenuItems:[
    //     {id:'5', title: "Submenu 1"},
    //     {id:'6', title: "Submenu 2"},
    //     {id:'7', title: "Submenu 3"},
    //   ],
    // },
    // {id:'7', title : "Analytics", icon: <AiOutlineBarChart />,menuRef:''},
    // {id:'8', title : "Inbox", icon: <AiOutlineMail />,menuRef:''}
  ]

  const makeActive = (id) => {
    // document.querySelector('.tabActive').style.backgroundColor='#fff';
    document.querySelector('.tabActive').classList.remove('tabActive');
    document.querySelector('.activeDiv').className = 'hideDiv';
    if (document.querySelector("#tab" + id)) {
      // document.querySelector("#tab"+id).style.backgroundColor='red';
      document.querySelector("#tab" + id).classList.add('tabActive');
      document.querySelector("#div" + id).className = 'activeDiv';
    }
    // document.getElementById('SideBarView').style.display = 'none';
  }

  const removeTab = (e,id) => {
    if (e)
      e.stopPropagation();
    let currentTab = document.querySelector("#tab" + id);
    let currentDiv = document.querySelector("#div" + id);
    let prevTab;
    let prevDiv;

  

    if (id == tabArr[0]) {
      if (!currentTab) {
        currentTab = document.querySelector("#tab" + tabArr[1]);
        currentDiv = document.querySelector("#div" + tabArr[1]);

        return false

        prevTab = currentTab.nextElementSibling;
        prevDiv = currentDiv.nextElementSibling;
      } else {
        prevTab = currentTab.nextElementSibling;
        prevDiv = currentDiv.nextElementSibling;
      }
    } else {
      if (!currentTab) {
        currentTab = document.querySelector("#tab" + tabArr[0]);
        currentDiv = document.querySelector("#div" + tabArr[0]);
        if (!currentTab) {
          return false;
        }

        prevTab = currentTab.previousElementSibling;
        prevDiv = currentDiv.previousElementSibling;
      } else {
        prevTab = currentTab.previousElementSibling;
        prevDiv = currentDiv.previousElementSibling;
      }

    }
    currentTab.remove();
    currentDiv.remove();
    let isActive = currentTab.classList.contains('tabActive');
    if (isActive && prevTab && prevDiv) {
      // prevTab.style.backgroundColor='red';
      prevTab.classList.add('tabActive');
      prevDiv.className = 'activeDiv';
    }
    tabArr = tabArr.filter(val => val != id);
    

  }

  const ComponentTag = (id) =>{
    const path = { 
      1 : lazy (()=> import('../views/header/header')), 
    };
    const TagName = path[id];
    const ComponentName = <TagName />

    return ComponentName;
  }

  const newTab = (e, name, id, Iconval, Component, token, caseType, tableData, editData, menuCode) => {
    if (!Component) {
      setMessage({ open: true, color: 'error', message: [['Page Under Development']] })
    } else {
      const duplicate = tabArr.find(val => val == name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""));
        setOpen(false);
      if (!duplicate) {
        tabArr.push(name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""));
        setTabArr([...TabArr, name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "")]);
  
        if (document.querySelector('.tabActive')) {
          document.querySelector('.tabActive').classList.remove('tabActive');
          document.querySelector('.activeDiv').className = 'hideDiv';
        }
  
        const IconComponent = getIconComponent(Iconval);
  
        let Content = (
          <div className="tabcontain" onClick={() => makeActive(name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""))}>
            <Tooltip title={name} placement="top">
              <span className={"tabIcons spanTab"}>
                <IconComponent className="SubMenuIcon" />
              </span>
            </Tooltip>
            <Tooltip title={name} placement="top">
              <span className="tabcontent">{name}</span>
            </Tooltip>
            <span className="tooltitle" style={{ float: 'right' }}>
              <CloseIcon className={'closeBtnTab'} onClick={(e) => { removeTab(e, name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""), token, caseType) }} />
              <span className="tooltiptext tooltip-right">Close</span>
            </span>
          </div>
        );
  
        const lastLi = document.querySelector('#tabs');
        const main = document.querySelector('#main');
        const li = document.createElement('li');
        const div = document.createElement('div');
        const tabli = 'tab' + name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "");
        const divID = 'div' + name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "");
        li.textContent = name;
        li.setAttribute("style", "background-color: " + localStorage.getItem("TabColor"));
        li.setAttribute('id', tabli);
        li.setAttribute('name', Component);
        li.setAttribute('class', 'liTabs tabActive');
        div.setAttribute('id', divID);
        div.setAttribute('class', 'activeDiv');
        lastLi.appendChild(li);
        main.appendChild(div);
  
        const rootTab = ReactDOM.createRoot(document.getElementById(tabli));
        const rootDiv = ReactDOM.createRoot(document.getElementById(divID));
  
        rootTab.render(Content);
        rootDiv.render(
          <ErrorBoundary FallbackComponent={name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "")} removeTab={{ key: e, id: name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""), errortoken: token, errorCase: caseType }} removeTabFunc={removeTab}>
           
                <React.Suspense fallback={<div style={{ margin: '8px' }}>
                  <div className="SkHeader">
                    <div style={{ width: '50%' }}>
                      <Skeleton variant="text" width={170} height={50} />
                    </div>
                    <div className='skrsearbarwbtn'>
                      <Skeleton variant="text" width={200} height={50} />
                      <Skeleton variant="text" width={90} height={50} />
                    </div>
                  </div>
                  <div className='SkeletonHeader'>
                    <div className='SkeletonHIcons'>
                      {[...Array(3)].map((_, index) => (
                        <React.Fragment key={index}>
                          <Skeleton variant="circle" width={30} height={30} />
                          <Skeleton variant="text" width={index === 1 ? 70 : 60} height={25} />
                        </React.Fragment>
                      ))}
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      {[...Array(4)].map((_, index) => (
                        <Skeleton variant="text" width={40} height={45} animation='wave' />
                      ))}
                    </div>
                  </div>
                  <div>
                    {[...Array(9)].map((_, index) => (
                      <Skeleton key={index} height={index === 0 || index === 8 ? 58 : 40} animation={index === 0 || index === 8 ? false : 'wave'} />
                    ))}
                  </div>
                </div>}>
                  
                  {ComponentTag(Component)}
                </React.Suspense>
              
          </ErrorBoundary>
        );
  
        if (tabArr.length > 30) {
          removeTab(e, Items[0].id, Items[0].token, Items[0].caseType)
          var arr = Items
          arr.splice(0, 1);
          arr.push({
            id: name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""),
            token: token,
            caseType: caseType
          });
          setItems(arr)
        } else {
          setItems([...Items, {
            id: name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""),
            token: token,
            caseType: caseType
          }])
        }
  
      } else {
        if (tableData || editData) {
          removeTab(e, name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""), token, caseType);
          tabArr.push(name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""));
          setTabArr([...TabArr, name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "")]);
          if (document.querySelector('.tabActive')) {
            document.querySelector('.tabActive').classList.remove('tabActive');
            document.querySelector('.activeDiv').className = 'hideDiv';
          }
  
          const IconComponent = getIconComponent(Iconval);
  
          let Content = (
            <div className="tabcontain" onClick={() => makeActive(name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""))}>
              <Tooltip title={name} placement="top">
                <span className={"tabIcons spanTab"}>
                  <IconComponent className="SubMenuIcon" />
                </span>
              </Tooltip>
              <Tooltip title={name} placement="top">
                <span className="tabcontent">{name}</span>
              </Tooltip>
              <span className="tooltitle" style={{ float: 'right' }}>
                <CloseIcon className={'closeBtnTab'} onClick={(e) => { removeTab(e, name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""), token, caseType) }} />
                <span className="tooltiptext tooltip-right">Close</span>
              </span>
            </div>
          );
  
          const lastLi = document.querySelector('#tabs');
          const main = document.querySelector('#main');
          const li = document.createElement('li');
          const div = document.createElement('div');
          const tabli = 'tab' + name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "");
          const divID = 'div' + name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "");
          li.textContent = name;
          li.setAttribute('id', tabli);
          li.setAttribute('class', 'liTabs tabActive');
          li.setAttribute('name', Component);
          div.setAttribute('id', divID);
          div.setAttribute('class', 'activeDiv');
          lastLi.appendChild(li);
          main.appendChild(div);
  
          const rootTab = ReactDOM.createRoot(document.getElementById(tabli));
          const rootDiv = ReactDOM.createRoot(document.getElementById(divID));
  
          rootTab.render(Content);
          rootDiv.render(
            <ErrorBoundary FallbackComponent={name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, "")} removeTab={{ key: e, id: name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""), errortoken: token, errorCase: caseType }} removeTabFunc={removeTab}>
            
                  <React.Suspense fallback={"Loading ..."}>
                    {ComponentTag(Component)}
                  </React.Suspense>
                
            </ErrorBoundary>
          );
  
          if (tabArr.length > 6) {
            removeTab(e, tabArr[0].id, tabArr[0].token, tabArr[0].caseType)
            var arr = Items;
            arr.splice(0, 1);
            arr.push({
              id: name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""),
              token: token,
              caseType: caseType
            });
            setItems(arr);
          } else {
            setItems([...Items, {
              id: name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""),
              token: token,
              caseType: caseType
            }]);
          }
        } else {
          makeActive(name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""));
        }
      }
  
      // props.TabsDetails(tabArr);
    }
  };

  return(
    <div >
      {/* <Header /> */}
    <div className='flex'>
      <div className={`bg-white p-5 pt-8 ${open ? "w-60	" : "w-16"} duration-300 relative`}
      style={{height:'91vh'}}
      >
        <div className="bg-white shadow-lg text-dark-purple text-2xl
            rounded-full absolute -right-3 top-20 z11 hover:bg-blue-600 hover:text-white
            border-dark-purple cursor-pointer">
            <GoChevronLeft style={{padding: '3px'}}
            className={`  ${
            !open && "rotate-180"
            }`}
            onClick={()=> setOpen(!open)}
            />

        </div>

        <div className="inline-flex">
          {/* <AiFillEnvironment
          className={`bg-amber-300 text-2xl rounded 
          cursor-pointer block float-left mr-2 duration-500 ${
            open && "rotate-[360deg]"
          }`}
          /> */}
          <h1
          className={`text-gray-600 origin-left font-medium text-lg
          duration-300 ${
            !open && "scale-0"
          }`}
          >
            Project
          </h1>
        </div>

        <div
        className={`flex items-center rounded-md bg-light-white
        mt-6 ${
          !open ? "px-2.5" : "px-4"
        } py-2`}
        >
          <BsSearch
          className={`text-white text-lg block float-left
          cursor-pointer ${
            open && "mr-2"
          }`}
          />

          <input
          type="search"
          placeholder="Search"
          className={`text-base bg-transparent w-full text-white
          focus:outline-none ${
            !open && "hidden"
          }`}
          />
        </div>

        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
            <li
            key={index}
            className={`text-gray-600 text-sm flex items-center
            gap-x-4 cursor-pointer p-2 hover:bg-light-white
            rounded-md ${menu.spacing ? "mt-9" : "mt-2"}`}
            onClick={(e)=>newTab(e,menu.title, menu.id, 'Profile',menu.menuRef, 1)}
            >
              <span className="text-2xl block float-left">
                {menu.icon ? menu.icon : <RiDashboardFill />}
              </span>
              <span
              className={`text-base font-medium flex-1
              duration-200 ${
                !open && "hidden"
              }`}
              >
                {menu.title}
              </span>
              {menu.submenu && open && (
                <BsChevronDown className={`${submenuOpen &&
                  "rotate-180"}`} onClick={()=>{
                  setSubmenuOpen(!submenuOpen)}} />
              )}
            </li>

            {menu.submenu && submenuOpen && open &&  (
              <ul>
                {menu.submenuItems.map((submenuItem, index) => (
                  <li key={index} className="text-gray-600 text-sm flex items-center
                  gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white">
                    {submenuItem.title}
                  </li>
                ))}
              </ul>
            )}
            </>
          ))}
        </ul>
      </div>

        <div className="w-full hidden" >
          {/* <h1 className="text-2xl font-semibold"> Home Page</h1> */}
          <div ref={MainContentRef} className="expandNav" id="expandid" onClick={(e)=>{console.log('tes')}}>
              <div className="sscolmaindiv" id="TabContents">
                  <div className="menuContent">
                      <div id="tabs" style={{ display: "flex", backgroundColor: "#fff", position: "sticky", top: "0", zIndex: "2" }}>
                        <li className={'liTabs tabActive'} onClick={() => makeActive('Home')} id="tabHome" style={{ marginLeft: '-1px', display: "none" }}>
                          <span className="tabIconsClasses spanTab"><HomeIcon /></span>Home
                        </li>
                      </div>
                      <div id="main" style={{ height: '82vh',background:'aliceblue' }}>
                        <div className="activeDiv" id="divHome">
                        </div>
                      </div>
                  </div>
              </div>
            </div>
        </div>

    </div>
    </div>
  )
}



class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}


export default NavMenu;
