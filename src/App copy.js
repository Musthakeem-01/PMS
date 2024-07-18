import React,{useRef, useState} from 'react';
import Header from './views/header/header';
import Projects from './views/projects';
import Notification from './components/utils/Notification';
import Loading from './components/utils/loading';
import ToggleButton from '@mui/material/ToggleButton';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DescriptionIcon from '@mui/icons-material/Description';
import CloseIcon from '@mui/icons-material/Close';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import getIconComponent from './components/utils/getIconComponent';
import HomeIcon from '@mui/icons-material/Home';
import ReactDOM from 'react-dom/client';

import { Icon, Tooltip } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';


let UserMenuDetails = [ {
  "AdminUserMenuIDPK": 1,
  "MenuID": 1,
  "MenuCode": "",
  "MenuDisplayName": "Projects",
  "ImportIcoRef": "الادارة",
  "MenuIconFont": "Person",
  "MenuOrder": 1,
  "MenuRef": 1,
  "ParentMenu": 0,
  "Sub1": []
},
{
  "AdminUserMenuIDPK": 2,
  "MenuID": 2,
  "MenuCode": "",
  "MenuDisplayName": "Filters",
  "ImportIcoRef": "الادارة",
  "MenuIconFont": "Home",
  "MenuOrder": 1,
  "MenuRef": 2,
  "ParentMenu": 0,
  "Sub1": []
},
{
  "AdminUserMenuIDPK": 3,
  "MenuID": 3,
  "MenuCode": "",
  "MenuDisplayName": "Dashboards",
  "ImportIcoRef": "الادارة",
  "MenuIconFont": "Settings",
  "MenuOrder": 1,
  "MenuRef": 3,
  "ParentMenu": 0,
  "Sub1": []
}]
var tabArr = [];

function App(props) {
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

  // Toggle Btn
  const openSlide = () => {
    if(!selected){
        document.getElementById("ThemeSlide").style.width = "28%"; 
        document.getElementById("floatButton").style.right = "382px";
    }else{
        document.getElementById("ThemeSlide").style.width = "0%"; 
        document.getElementById("floatButton").style.right = "8px";
    }
    
    setSelected(!selected);
}

const listClassDivBtn  = (e) => {}
const listMenuActive  = (e) => {}
const MenuClickAwayhm = (e) =>{}
const handleChange = (e) =>{}
const SmIconSubMod = (e) =>{}
const CollapseAll = (e) =>{}

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

function MenuClickAway  (e)  { 
  
}
const message = (id, level) =>{        
  setMessage({ open:true,color:'error',message: [['Page Under Development']]})
}
const firstMenuhtml = UserMenuDetails.map((menu,index)=>{
  
  const Icon = getIconComponent(menu.MenuIconFont);

  return (
    <div key={index}>
      {menu.Sub1.length > 0 ? (
        <div className={(!expandMenu && "expripple") + " btnDiv ripple"}
          style={{
            backgroundColor: menu.AdminUserMenuIDPK === SlideBgColor ? "rgb(255 255 255 / 44%)" : "",
            borderTopLeftRadius: menu.AdminUserMenuIDPK === SlideBgColor ? "10px" : "",
            borderBottomLeftRadius: menu.AdminUserMenuIDPK === SlideBgColor ? "10px" : "",
          }}
          id={menu.AdminUserMenuIDPK}
          onClick={(e) => { console.log('click1') }}>
          <div>
            <Tooltip placement="right" title={menu.MenuDisplayName}>
              <span className="iconspan"><Icon className="iconpad" /></span>
            </Tooltip>
          </div>
          {!expandMenu &&
            <span className="labeltxt"> {menu.MenuDisplayName}</span>}
        </div>
      ) : (
        <div className={(!expandMenu && "expripple") + " btnDiv ripple"}
          id={menu.AdminUserMenuIDPK}
          style={{ background: 'transparent' }}
          onClick={(e) => {
            if (menu.MenuRef) {
              console.log('click2')
              newTab(e,menu.MenuDisplayName, menu.AdminUserMenuIDPK, menu.MenuIconFont,menu.MenuRef, menu.MenuCode)
            } else {
              message(menu.id, 'submenu1');
            }

            UserMenuDetails.filter(item => item.MenuOrder === '1').map((menu) => {
              document.getElementById(menu.AdminUserMenuIDPK).classList.remove('tgactive')
            });
            document.getElementById(menu.AdminUserMenuIDPK).classList.add('tgactive');
          }}>
          <div>
            <Tooltip placement="right" title={menu.MenuDisplayName}>
              <span className="iconspan"><Icon className="iconpad" /></span>
            </Tooltip>
          </div>
          {!expandMenu &&
            <span className="labeltxt"> {menu.MenuDisplayName}</span>}
        </div>
      )}
      <ul className="nav-flyout ulist-padding ulscrollhid" id={"ul" + menu.AdminUserMenuIDPK}>
        <div style={{ overflow: 'scroll', height: '100%', width: "90%" }}>
          {menu.Sub1.length !== 0 &&
            menu.Sub1.map((submenu, subIndex) => (
              submenu.Sub2.length !== 0 ?
                <Accordion key={subIndex} expanded={CollapseOpen ? CollapseOpen : expanded === submenu.MenuID} onChange={handleChange(submenu.MenuID)}>
                  <AccordionSummary aria-controls="panel1bh-content" id="panel1bh-header">
                    <div id={submenu.MenuID + '_sm'} className={`Accmenucontent ${expanded === submenu.MenuID ? "AccmenucontentAct" : ""}`}>
                      <span className="subitem-listicon"><span className='subitem-icon'>{submenu.MenuDisplayName.substring(0, 1)}</span></span>
                      <span className="subitem-list">{submenu.MenuDisplayName}</span>
                      <div className="Menuopenall tooltitle">
                        {!CollapseOpen ?
                          <>
                            <ExpandMoreIcon height="1rem" className="MenuExpandicon" onClick={CollapseAll} /><span className="tooltiptext tooltip-right">Open All</span>
                          </>
                          :
                          <>
                            <ExpandLessIcon height="1rem" className="MenuExpandicon" onClick={CollapseAll} /><span className="tooltiptext tooltip-right">Close All</span>
                          </>
                        }
                      </div>
                    </div>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="width100">
                      {submenu.Sub2.map((subsubmenu, subsubIndex) => (
                        <a menuctrlid={"msf" + subsubmenu.menuctrlid} id={subsubmenu.MenuCtrlID + '_fm'} key={subsubIndex} className="tagripple"
                          onClick={(e) => {
                            if (subsubmenu.MenuRef) {
                                console.log('click3')
                            } else {
                              message(subsubmenu.id, 'submenu1');
                            }
                          }}>
                          <span className="subitem-listicon"><Icon className="iconsm" /></span>
                          <span className="subfontSty">{subsubmenu.MenuDisplayName}</span>
                        </a>
                      ))}
                    </div>
                  </AccordionDetails>
                </Accordion>
                :
                <a menuctrlid={"msf" + submenu.menuctrlid} id={submenu.MenuCtrlID + '_fm'} className="tagripple"
                  key={subIndex}
                  onClick={(e) => { if (submenu.MenuRef) { MenuClickAway(true); setNewTabData({ event: e, name: submenu.MenuDisplayName, idpk: submenu.AdminUserMenuIDPK, icon: submenu.MenuIconFont, ref: submenu.MenuRef, menuCode: submenu.MenuCode });  } else { message(submenu.id, 'submenu1') } }}>
                  <span className="subitem-listicon"><Icon className="iconsm" /></span>
                  <span className="subfontSty">{submenu.MenuDisplayName}</span>
                </a>
            ))}
        </div>
      </ul>
    </div>
  );

  
})


const ComponentTag = (data, tableData, editdata, id, menucode, name) => {
  // const TagName = PathJson[data];
  const ComponentName = <div> test components open</div>;
  return ComponentName;
}
function removeTab(){}

const newTab = (e, name, id, Iconval, Component, token, caseType, tableData, editData, menuCode) => {
  if (!Component) {
    setMessage({ open: true, color: 'error', message: [['Page Under Development']] })
  } else {
    const duplicate = tabArr.find(val => val == name.replace(/[&\/\\#,+()$~%.'":*?<>{}/\s+/g]/g, ""));

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
                  <p>hi new ComponentTag</p>
                {/* {ComponentTag(Component, tableData, editData, id, menuCode, name)} */}
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
                  <p>hi new commonstyles</p>
                  {/* {ComponentTag(Component, tableData, editData, id, menuCode, name)} */}
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


  return (
    <div>
      <Notification open={Message.open} color={Message.color} 
          message={Message.message} onClose={()=>setMessage({open: false,color: Message.color,message: []})} />
      {loading && <Loading loading={loading} />}
      
                <div id="SideScreen" onClick={()=>console.log('SideScreen')}></div>
                <div ref={SideBarRef}><Header />
                <section className="app" style={{display: 'contents'}}> 
                                <aside className="sidebar" id="sidebarwid">
                                        <div className="sidebar-nav" id="sidenavcolor">
                                           
                                            <ul >
                                                {firstMenuhtml}
                                            </ul>
                                            
                                        </div>

                                </aside>
                            {/* </ClickAwayListener> */}
                    </section> 
                </div>

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

  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null, reload: true, params: this.props.removeTab };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error: error,
      errorInfo: errorInfo
    });

    // You can also log error messages to an error reporting service here
  }

  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.Please reopen the tab</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            style={{ margin: "2%" }}
            onClick={() => {
              this.forceUpdate(); this.props.removeTabFunc(this.state.params.key, this.state.params.id, this.state.params.errortoken, this.state.params.errorCase);
            }}
            startIcon={<CloseIcon />}>Close the tab </Button>
          <Button style={{ margin: "2%" }}
            variant="contained"
            size="small"
            color="primary"
            onClick={() => {
              window.location.reload(true)
            }}
            startIcon={<RefreshIcon />}>Reload the Page</Button>




        </div>
      );
    }
    return this.props.children;


  }
}

export default App;
