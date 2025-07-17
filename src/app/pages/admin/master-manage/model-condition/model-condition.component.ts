import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterHttpService } from 'src/app/http/master-http.service';
import * as ExcelJS from 'ExcelJs';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-model-condition',
  templateUrl: './model-condition.component.html',
  styleUrls: ['./model-condition.component.scss']
})
export class ModelConditionComponent implements OnInit {
  displayedColumns: any = []
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _master_service: MasterHttpService
  ) { }

  ngOnInit(): void {
    this.getData()
  }
  getData() {
    this._master_service.getModelCondition().subscribe((resData: any) => {
      console.log("🚀 ~ resData:", resData)
      this.dataSource = new MatTableDataSource(resData);
      this.displayedColumns = ['No', 'Model', 'Model Name', 'Customer', 'Max interval', 'Size'];
      let ignoreKey = ['_id', 'createdAt', 'updatedAt']
      for (const key in resData[0]) {
        if (ignoreKey.includes(key)) {
          continue; // Skip if the key is in ignoreKey
        }
        if (this.displayedColumns.some((col: string) => col === key)) {
          continue; // Skip if the column is already in displayedColumns
        }
        this.displayedColumns.push(key);
      }
      this.tableConfig();
    });
  }
  tableConfig() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log("🚀 ~ file:", file)
    // file has xlsx or csv
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        try {
          const arrayBuffer = e.target.result;
          const workbook = new ExcelJS.Workbook();

          // Read the Excel file from array buffer
          await workbook.xlsx.load(arrayBuffer);

          // Get the first worksheet
          const worksheet = workbook.getWorksheet(1);

          if (!worksheet) {
            console.error('No worksheet found');
            return;
          }

          // Convert worksheet data to JSON
          const jsonData = this.excelToJson(worksheet);
          console.log('Parsed Excel data:', jsonData);

          // Upload the processed data
          this._master_service.insertModelCondition(jsonData).subscribe(
            (res: any) => {
              console.log("File uploaded successfully", res);
              Swal.fire({
                title: 'Success',
                text: 'File uploaded successfully',
                icon: 'success',
                confirmButtonText: 'OK'
              });
              this.getData(); // Refresh data after upload
            },
            (error: any) => {
              console.error("Error uploading file", error);
            }
          );
        } catch (error) {
          console.error('Error processing Excel file:', error);
        }
      };
      // Read as array buffer instead of text for Excel files
      reader.readAsArrayBuffer(file);
    }
  }

  /**
   * Converts an Excel worksheet to JSON data
   * @param worksheet The ExcelJS worksheet
   * @returns Array of objects representing the worksheet data
   */
  excelToJson(worksheet: ExcelJS.Worksheet): any[] {
    const jsonData: any[] = [];

    // Get header row (assuming first row contains headers)
    const headers: string[] = [];
    worksheet.getRow(1).eachCell((cell, colNumber) => {
      headers[colNumber - 1] = cell.value?.toString().replace('.', '') || `Column${colNumber}`;
    });

    // Process data rows (starting from row 2)
    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber > 1) { // Skip header row
        const rowData: any = {};
        row.eachCell((cell, colNumber) => {
          const header = headers[colNumber - 1];
          rowData[header] = cell.value?.toString() || ''; // Convert cell value to string
        });
        jsonData.push(rowData);
      }
    });

    return jsonData;
  }


  downloadFile() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Model Condition Data');

    // Define headers
    const headers = this.displayedColumns
    worksheet.addRow(headers);

    // Add data rows
    this.dataSource.data.forEach((item: any, index: number) => {
      const rowData = this.displayedColumns.map((key: any) => {
        return item[key] || ''; // Use empty string if key not found
      })
      worksheet.addRow(rowData);
    });

    // Set column widths
    worksheet.columns.forEach(column => {
      column.width = 20; // Set a default width for all columns
    });

    // Save the workbook to a file
    workbook.xlsx.writeBuffer().then((buffer: ArrayBuffer) => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'model_condition_data.xlsx';
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }

}
