document.getElementById('uploadExcel').addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });

        //get data from sheet 1 of the excel
        const sheetName = workbook.SheetNames[0];               
        const worksheet = workbook.Sheets[sheetName];
        const rectData = XLSX.utils.sheet_to_json(worksheet);

        
        //get data from sheet 2 of the excel
        const sheetConnectData = workbook.SheetNames[1];               
        const worksheetConnectData = workbook.Sheets[sheetConnectData];
        const connectData = XLSX.utils.sheet_to_json(worksheetConnectData);

        if (rectData.length === 0) {
          document.getElementById('output').innerHTML = '<p>No data found in Excel file.</p>';
          return;
        }
			//create an object rectangle for every row 
			let newRect= rectData.map(row => new DraggableRect(row.x, row.y, row.w, row.h, row.caption,row.bopKey));			
			for (let i = newRect.length - 1; i >= 0; i--){
				rectangles.push(newRect[i]);
				}

       //create an oject connect from the data
       
      let connectA =null;
      let connectB =null;
      connectData.forEach(connect => {
        if (connect.ITEM_KEY === "NXT_PROC"){
            rectangles.forEach(rect => {
              if (rect.bopKey === connect.PROC_KEY){
                if (connectA ===null){
                    connectA = rect
                }                
              }
              if (rect.bopKey === connect.ITEM_VALUE){
                if (connectB ===null){
                    connectB = rect
              }
            }
              if (connectA !==null && connectB !==null){
                connections.push(new Connection(connectA, connectB));
                connectA = null;
                connectB = null;                
              }

            });
        }    
      });
    };

			reader.readAsArrayBuffer(file);
			
});
