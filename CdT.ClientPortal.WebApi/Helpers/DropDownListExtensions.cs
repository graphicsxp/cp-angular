using Cdt.Common.BE;
using ClientPortal.Helpers.Constants;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;

namespace ClientPortal.Helpers.Extensions
{
    /// <summary>
    /// 
    /// </summary>
    public enum ComboSelectionType
    {
        /// <summary>
        /// No selection
        /// </summary>
        None,
        /// <summary>
        /// Select item
        /// </summary>
        Select,
        /// <summary>
        /// All Item
        /// </summary>
        All
    }

    public static class DropDownListExtensions
    {
        /// <summary>
        /// Populates the specified combo.
        /// </summary>
        /// <param name="combo">The combo.</param>
        /// <param name="source">The source.</param>
        /// <param name="selectionType">Type of the selection.</param>
        public static void Populate(this DropDownList combo, IList<ComboBoxItem> source, ComboSelectionType selectionType)
        {
            populate(combo, source, selectionType);
        }

        /// <summary>
        /// Populates the specified combo.
        /// </summary>
        /// <param name="combo">The combo.</param>
        /// <param name="source">The source.</param>
        public static void Populate(this DropDownList combo, IList<ComboBoxItem> source)
        {
            populate(combo, source);
        }

        /// <summary>
        /// Populates the with code.
        /// </summary>
        /// <param name="combo">The combo.</param>
        /// <param name="source">The source.</param>
        /// <param name="selectionType">Type of the selection.</param>
        public static void PopulateWithCode(this DropDownList combo, IList<ComboBoxItem> source, ComboSelectionType selectionType)
        {
            var items = (from p in source
                         orderby p.Value
                         select new ComboBoxItem(){Text = p.Value,Value = p.Value}).ToArray();
            populate(combo, items, selectionType);
        }

        /// <summary>
        /// Populates the with code.
        /// </summary>
        /// <param name="combo">The combo.</param>
        /// <param name="source">The source.</param>
        public static void PopulateWithCode(this DropDownList combo, IList<ComboBoxItem> source)
        {
            PopulateWithCode(combo, source, ComboSelectionType.None);
        }

        /// <summary>
        /// Populates the specified combo.
        /// </summary>
        /// <param name="combo">The combo.</param>
        /// <param name="source">The source.</param>
        /// <param name="selectionType">Type of the selection.</param>
        private static void populate(DropDownList combo, IList<ComboBoxItem> source, ComboSelectionType selectionType)
        {
            string selectedValue = combo.SelectedValue;
            combo.Items.Clear();
            switch (selectionType)
            {
                case ComboSelectionType.None:
                    break;
                case ComboSelectionType.Select:
                    combo.Items.Add(new ListItem(Tools.GetGlobalResource(ResourceNamespace.UI, "Select"), "-1"));
                    break;
                case ComboSelectionType.All:
                    combo.Items.Add(new ListItem(Tools.GetGlobalResource(ResourceNamespace.UI, "All"), "-1"));
                    break;
            }
            var items = from p in source
                        orderby p.Text
                        select new ListItem(p.Text, p.Value);
            combo.Items.AddRange(items.ToArray());
            if (!string.IsNullOrEmpty(selectedValue))
                combo.SelectedValue = selectedValue;
        }

        /// <summary>
        /// Populates the specified combo.
        /// </summary>
        /// <param name="combo">The combo.</param>
        /// <param name="source">The source.</param>
        private static void populate(DropDownList combo, IList<ComboBoxItem> source)
        {
            populate(combo, source, ComboSelectionType.None);
        }
    }
}

