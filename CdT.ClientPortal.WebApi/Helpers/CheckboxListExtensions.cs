using Cdt.Common.BE;
using Cdt.Common.Utils;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;

namespace ClientPortal.Helpers.Extensions
{
    /// <summary>
    /// Checkboxlist extensions 
    /// </summary>
    public static class CheckBoxListExtensions
    {
        public static void Populate(this CheckBoxList list, IList<ComboBoxItem> source)
        {
            IList<string> selectedValues = (from ListItem li in list.Items
                                            where li.Selected == true
                                            select li.Value).ToList();
            list.Items.Clear();
            foreach (ComboBoxItem cbi in source.OrderBy(p => p.Text))
            {
                ListItem li = new ListItem();
                li.Text = cbi.Text;
                li.Value = cbi.Value;
                li.Attributes.Add("title", cbi.Text);
                list.Items.Add(li);
            }
            IList<ListItem> toBeSelected = (from ListItem li in list.Items
                                            where selectedValues.Contains(li.Value)
                                            select li).ToList();
            foreach (ListItem li in toBeSelected)
            {
                li.Selected = true;
            }
        }

        public static void PopulateWithCode(this ListControl list, IList<ComboBoxItem> source)
        {
            IList<string> selectedValues = (from ListItem li in list.Items
                                            where li.Selected == true
                                            select li.Value).ToList();
            list.Items.Clear();
            foreach (ComboBoxItem cbi in source.OrderBy(p => p.Value))
            {
                ListItem li = new ListItem();
                li.Text = cbi.Value;
                li.Value = cbi.Value;
                li.Attributes.Add("title", cbi.Text);
                list.Items.Add(li);
            }
            IList<ListItem> toBeSelected = (from ListItem li in list.Items
                                            where selectedValues.Contains(li.Value)
                                            select li).ToList();
            foreach (ListItem li in toBeSelected)
            {
                li.Selected = true;
            }
        }
    }
}

