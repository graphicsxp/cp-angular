using System.Web.UI.WebControls;
using System;

namespace ClientPortal.Helpers
{
    public static class LabelExtension
    {
        private const string moreText="[...]";
        public static void Tooltipify(this Label label,string text, int maxLength)
        {
            if (maxLength <= 0)
            {
                throw new ArgumentException("maxlength must be greatet than 0");
            }
            if (text != null)
            {
                int length = maxLength - moreText.Length;
                label.Text = text.Length > maxLength ? text.Substring(0, length) + moreText : text;
                label.ToolTip = text;
            }
            else
            {
                label.Text = null;
                label.ToolTip = null;
            }
        }
    }
}
