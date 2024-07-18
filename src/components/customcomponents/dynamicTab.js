import React from 'react';


export default function Table(props){
    


    return(
    <div className="flex flex-col w-full mt-2" style="height:70vh">
      {props.tableTitle && <p className="text-blue-600 text-sm">{props.tableTitle}</p>}
      <div className="relative my-1 mt-2 mb-2 w-full px-2">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input type="text" id="searchTableInput" placeholder="Search..."
          className="bg-white border border-gray-300 text-slate-900 text-xs  rounded-lg focus:outline-none focus:ring-blue-600 ring-2 focus:border-blue-500 block w-2/3 pl-10 p-2" />
      </div>

      <div className="flex-grow px-0 overflow-auto scroll-smooth custom-scrollbar shadow-md rounded-md ">
        <table id="" className="relative tracking-wider w-full border text-left text-xs text-slate-500">
          <thead className="text-xs text-blue-600 uppercase">
            <tr>
              {props.TableHeader &&
                props.TableHeader.map(({key, header})=>(
                    <th className='sticky top-0 py-2 px-2 bg-gray-200'>{header}</th>
                ))
              }
            </tr>
          </thead>
          <tbody id="woHistoryDy_Table" className="divide-y bg-blue-50 text-slate-800 bg-white">
  {props.TableBody.length > 0 &&
    props.TableBody
      .filter(row => row[Object.keys(row).find(key => key.endsWith("IDPK"))])
      .map((x, i) => {
        const rowColumns = props.TableHeader.map(({ key }) => {
          if (key === "Status") {
            // Add button for the Status column
            return (
              <td key={key} className="p-1">
                <button
                  className="status-btn bg-red-500 text-xs text-white px-3 py-1 font-medium rounded-full hover:bg-red-600"
                  data-idpk={x[Object.keys(x).find(key => key.endsWith("IDPK"))]}
                >
                  Failed
                </button>
              </td>
            );
          } else {
            return (
              <td key={key} className="p-1" title={x[key]}>
                {x[key] == null || x[key] === "-" ? "" : x[key]}
              </td>
            );
          }
        });

        return (
          <tr
            key={x.ComplaintIDPK}
            onClick={() => openTaskByComplaintID(x.ComplaintIDPK)}
            className={`bg-white border-b hover:bg-blue-100 hover:text-blue-600 cursor-pointer ${i % 2 !== 0 && "bg-slate-50"}`}
            data-idpk={x[Object.keys(x).find(key => key.endsWith("IDPK"))]}
          >
            {rowColumns}
          </tr>
        );
      })}
</tbody>

        </table>
      </div>
    </div>
    )

}