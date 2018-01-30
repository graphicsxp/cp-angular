//using Cdt.ClientPortal.Core;
//using Cdt.Web.UI.WebControls;
//using System.Collections.Generic;
//using System.Collections;
//using System.IO;
//using System.Web.UI;
//using System;
//using Telerik.Web.UI;

//namespace ClientPortal.Helpers.Extensions
//{
//    /// <summary>
//    /// Load and save grid settings
//    /// </summary>
//    public static class RadGridExtensions
//    {
//        //this method should be called on Render 
//        /// <summary>
//        /// Gets the filter expression.
//        /// </summary>
//        /// <param name="gridInstance">The grid instance.</param>
//        /// <returns></returns>
//        public static Cdt.ClientPortal.Core.FilterExpressionCollection GetFilterExpression(this RadGrid gridInstance)
//        {
//            var filter = new Cdt.ClientPortal.Core.FilterExpressionCollection();
//            foreach (GridColumn column in gridInstance.MasterTableView.Columns)
//            {
//                if (column.CurrentFilterFunction != GridKnownFunction.NoFilter)
//                {
//                    FilterKnownDataType dataType = FilterKnownDataType.String;
//                    switch (column.DataTypeName)
//                    {
//                        case "System.String":
//                            dataType = FilterKnownDataType.String;
//                            break;
//                        case "System.DateTime":
//                            dataType = FilterKnownDataType.DateTime;
//                            break;
//                        case "System.TimeSpan":
//                            dataType = FilterKnownDataType.TimeSpan;
//                            break;
//                            /* case "System.Boolean":
//                            dataType = FilterKnownDataType.Boolean;
//                            break;*/
//                        case "System.Int16":
//                        case "System.Int32":
//                        case "System.Int64":
//                        case "System.UInt16":
//                        case "System.UInt32":
//                        case "System.UInt64":
//                            dataType = FilterKnownDataType.Int32;
//                            break;
//                    /*case "System.Decimal":
//                    case "System.Double":
//                    case "System.Single":
//                    dataType = FilterKnownDataType.Decimal;
//                    break;*/
//                    }

//                    string fieldName = null;

//                    //dropdown filter case
//                    DropdownFilteredColumn col = column as DropdownFilteredColumn;
//                    if (col != null)
//                    {
//                        fieldName = col.FilterField;
//                    }
//                    else
//                    {
//                        GridBoundColumn boundcolumn = column as GridBoundColumn;
//                        if (boundcolumn != null)
//                        {
//                            fieldName = boundcolumn.DataField;
//                        }
//                        else
//                        {
//                            GridTemplateColumn templatecolumn = column as GridTemplateColumn;
//                            if (templatecolumn != null)
//                            {
//                                fieldName = templatecolumn.DataField;
//                            }
//                        }
//                    }

//                    filter.Add(new Cdt.ClientPortal.Core.FilterExpression()
//                               {
//                                   FieldName = fieldName,
//                                   Operator = (FilterKnownFunction)System.Enum.Parse(typeof(FilterKnownFunction), column.CurrentFilterFunction.ToString()),
//                                   Value = column.CurrentFilterValue,
//                                   DataType = dataType
//                               });
//                }
//            }
//            return filter;
//        }

//        /// <summary>
//        /// Gets the sort expression.
//        /// </summary>
//        /// <param name="gridInstance">The grid instance.</param>
//        /// <returns></returns>
//        public static Cdt.ClientPortal.Core.SortExpressionCollection getSortExpression(this RadGrid gridInstance)
//        {
//            //rebuild filter and sort
//            var sort = new Cdt.ClientPortal.Core.SortExpressionCollection();
//            foreach (GridSortExpression p in gridInstance.MasterTableView.SortExpressions)
//            {
//                if (p.SortOrder != GridSortOrder.None)
//                    sort.Add(new Cdt.ClientPortal.Core.SortExpression() { FieldName = p.FieldName, SortOrder = (SortOrder)System.Enum.Parse(typeof(SortOrder), p.SortOrderAsString(), true) });
//            }
//            return sort;
//        }

//        /// <summary>
//        /// Hides the data columns except last.
//        /// </summary>
//        /// <param name="gridInstance">The grid instance.</param>
//        public static void HideDataColumnsExceptLast(this RadGrid gridInstance)
//        {
//            for (int i = 0; i < gridInstance.Columns.Count - 1; i++)
//            {
//                gridInstance.Columns[i].Visible = false;
//            }
//        }

//        /// <summary>
//        /// Resets the grid grouping/sorting/paging.
//        /// </summary>
//        /// <param name="gridInstance">The grid instance.</param>
//        public static void ResetGrid(this RadGrid gridInstance)
//        {
//            //clear sorting/grouping/paging
//            gridInstance.MasterTableView.SortExpressions.Clear();
//            gridInstance.MasterTableView.GroupByExpressions.Clear();
//            gridInstance.MasterTableView.CurrentPageIndex = 0;
//        }

//        public static void LoadDefaultSettings(this RadGrid gridInstance)
//        {
//            //display cdt key, title status and creation date
//            foreach (GridColumn column in gridInstance.MasterTableView.Columns)
//            {
//                column.Visible = false;
//            }

//            //gridInstance.MasterTableView.Columns[2].Visible = true;
//            //gridInstance.MasterTableView.Columns[9].Visible = true;
//            //gridInstance.MasterTableView.Columns[10].Visible = true;
//            //gridInstance.MasterTableView.Columns[11].Visible = true;
//            //gridInstance.MasterTableView.Columns[13].Visible = true;
//            if (gridInstance.ID == "uxRequestsGrid")
//            {
//                gridInstance.MasterTableView.Columns.FindByUniqueName("RequestId").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("Status").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("Title").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("RequestDetails").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("CdtKey").Visible = true;
//            }
//            else if (gridInstance.ID == "uxAssignmentsGrid")
//            {
//                gridInstance.MasterTableView.Columns.FindByUniqueName("RequestId").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("SourceLanguage").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("TargetLanguage").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("Quantity").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("RequestDownloadDetails").Visible = true;
//                gridInstance.MasterTableView.Columns.FindByUniqueName("CdtKey").Visible = true;
//            }

//            //later we might need a filter or sort
//        }

//        public static void LoadSettings(this RadGrid gridInstance, string settings)
//        {
//            if (String.IsNullOrEmpty(settings))
//                return;
//            object[] gridSettings = null;
//            LosFormatter formatter = new LosFormatter();

//            using (StringReader reader = new StringReader(settings))
//            {
//                gridSettings = (object[])formatter.Deserialize(reader);
//            }

//            //Load groupBy
//            GridGroupByExpressionCollection groupByExpressions = gridInstance.MasterTableView.GroupByExpressions;
//            groupByExpressions.Clear();

//            object[] groupExpressionsState = (object[])gridSettings[0];

//            int count = 0;
//            foreach (object obj in groupExpressionsState)
//            {
//                GridGroupByExpression expression = new GridGroupByExpression();
//                ((IStateManager)expression).LoadViewState(obj);
//                groupByExpressions.Add(expression);
//                count++;
//            }

//            //Load sort expressions
//            gridInstance.MasterTableView.SortExpressions.Clear();
//            ((IStateManager)gridInstance.MasterTableView.SortExpressions).LoadViewState(gridSettings[1]);

//            //Load columns order
//            int columnsLength = gridInstance.MasterTableView.Columns.Count +
//                                gridInstance.MasterTableView.AutoGeneratedColumns.Length;

//            Pair[] columnOrder = (Pair[])gridSettings[2];
//            Pair[] columnFilter = (Pair[])gridSettings[4];
//            List<bool> visibleCols = (List<bool>)gridSettings[5];

//            if (columnsLength == columnOrder.Length)
//            {
//                ArrayList allColumns = new ArrayList(columnsLength);

//                allColumns.AddRange(gridInstance.MasterTableView.Columns);
//                allColumns.AddRange(gridInstance.MasterTableView.AutoGeneratedColumns);

//                int i = 0;
//                foreach (GridColumn column in allColumns)
//                {
//                    column.OrderIndex = (int)columnOrder[i].First;
//                    //column.HeaderStyle.Width = (Unit)columnOrder[i].Second;

//                    column.CurrentFilterFunction = (GridKnownFunction)columnFilter[i].First;
//                    column.CurrentFilterValue = (string)columnFilter[i].Second;

//                    column.Visible = visibleCols[i];

//                    i++;
//                }
//            }

//            //Load filter expression
//            gridInstance.MasterTableView.FilterExpression = (string)gridSettings[3];

//            //page size
//            if (gridSettings.Length == 7)
//            {
//                gridInstance.MasterTableView.PageSize = gridInstance.PageSize = (int)gridSettings[6];
//            }
//        }

//        public static string SaveSettings(this RadGrid gridInstance)
//        {
//            object[] gridSettings = new object[7];

//            //Save groupBy
//            GridGroupByExpressionCollection groupByExpressions = gridInstance.MasterTableView.GroupByExpressions;
//            object[] groupExpressions = new object[groupByExpressions.Count];

//            int count = 0;
//            foreach (GridGroupByExpression expression in groupByExpressions)
//            {
//                groupExpressions[count] = ((IStateManager)expression).SaveViewState();
//                count++;
//            }

//            gridSettings[0] = groupExpressions;

//            //Save sort expressions
//            gridSettings[1] = ((IStateManager)gridInstance.MasterTableView.SortExpressions).SaveViewState();

//            //Save columns order
//            int columnsLength = gridInstance.MasterTableView.Columns.Count + gridInstance.MasterTableView.AutoGeneratedColumns.Length;

//            Pair[] columnOrder = new Pair[columnsLength];
//            Pair[] columnFilter = new Pair[columnsLength];
//            List<bool> visibleColumns = new List<bool>(columnsLength);

//            ArrayList allColumns = new ArrayList(columnsLength);

//            allColumns.AddRange(gridInstance.MasterTableView.Columns);
//            allColumns.AddRange(gridInstance.MasterTableView.AutoGeneratedColumns);

//            int i = 0;
//            foreach (GridColumn column in allColumns)
//            {
//                Pair p = new Pair();
//                p.First = column.OrderIndex;
//                //p.Second = column.HeaderStyle.Width;

//                Pair f = new Pair();
//                f.First = column.CurrentFilterFunction;
//                f.Second = column.CurrentFilterValue;

//                columnOrder[i] = p;
//                columnFilter[i] = f;
//                visibleColumns.Add(column.Visible);

//                i++;
//            }

//            gridSettings[2] = columnOrder;

//            //Save filter expression
//            gridSettings[3] = (object)gridInstance.MasterTableView.FilterExpression;
//            gridSettings[4] = columnFilter;

//            //Save visible columns
//            gridSettings[5] = visibleColumns;

//            //save paging
//            gridSettings[6] = gridInstance.PageSize;

//            LosFormatter formatter = new LosFormatter();
//            using (StringWriter writer = new StringWriter())
//            {
//                formatter.Serialize(writer, gridSettings);
//                return writer.ToString();
//            }
//        }

//        /// <summary>
//        /// Shows the index of the column at.
//        /// </summary>
//        /// <param name="gridInstance">The grid instance.</param>
//        /// <param name="columnName">Name of the column.</param>
//        /// <param name="indexPosition">The index position.</param>
//        public static void ShowColumnAtIndex(this RadGrid gridInstance, string columnName, int indexPosition)
//        {
//            GridColumn col = gridInstance.Columns.FindByUniqueName(columnName);
//            col.OrderIndex = indexPosition;
//            col.Visible = true;
//        }

//        /// <summary>
//        /// Configures  the grid for an export: set MaxDisplayLength to 0
//        /// </summary>
//        /// <param name="gridInstance">The grid instance.</param>
//        public static void ConfigureForExport(this RadGrid gridInstance)
//        {
//            foreach (GridColumn c in gridInstance.MasterTableView.RenderColumns)
//            {
//                if (c is CdtGridBoundColumn)
//                {
//                    CdtGridBoundColumn col = c as CdtGridBoundColumn;
//                    col.MaxDisplayLength = 0;
//                }
//                if (c is CdtGridTemplateColumn)
//                {
//                    CdtGridTemplateColumn col = c as CdtGridTemplateColumn;
//                    col.MaxDisplayLength = 0;
//                }
//            }
//        }
//    }
//}

