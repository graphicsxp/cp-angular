using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Web.Profile;
using System.Web.Security;

namespace ClientPortal.Membership.Utils
{
    /// <summary>
    /// User profile class
    /// </summary>
    public class UserProfile : ProfileBase
    {
        public virtual Personal Personal
        {
            get { return (Personal)base["Personal"]; }
            set { base["Personal"] = value; }

        }

        public Settings Settings
        {
            get { return (Settings)base["Settings"]; }
            set { base["Settings"] = value; }
        }

        public static UserProfile GetProfile(string username)
        {
            return Create(username) as UserProfile;
        }

        public static UserProfile GetProfile()
        {
            return Create(System.Web.Security.Membership.GetUser(false).UserName) as UserProfile;
        }
    }

    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class Personal
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Phone { get; set; }

        public int OrganisationId { get; set; }

        public int DepartmentId { get; set; }

        public string ContactName { get; set; }
    }

    /// <summary>
    /// 
    /// </summary>
    [Serializable]
    public class Settings
    {
        public string Theme { get; set; }

        public RequestListTemplateKeyedCollection RequestTemplate { get; set; }

        public AssignmentDetailsListTemplateKeyedCollection AssignmentDetailsTemplate { get; set; }

        public ForecastSettings ForecastSetting { get; set; }

        public CsfSettings CsfSetting { get; set; }

        public PersonalWebSiteSettings PersonalWebSiteSetting { get; set; }

        public Settings()
        {
            RequestTemplate = new RequestListTemplateKeyedCollection();
            AssignmentDetailsTemplate = new AssignmentDetailsListTemplateKeyedCollection();
            ForecastSetting = new ForecastSettings();
            PersonalWebSiteSetting = new PersonalWebSiteSettings();
            CsfSetting = new CsfSettings();
        }
    }

    /// <summary>
    /// 
    /// </summary>
    public class RequestListTemplateKeyedCollection : KeyedCollection<string, RequestListTemplate>
    {
        protected override string GetKeyForItem(RequestListTemplate item)
        {
            return item.TemplateName;
        }
    }

    [Serializable]
    public class RequestListTemplate
    {
        private string _gridSettings;
        private string _templateName;

        public string TemplateName
        {
            get
            {
                return _templateName;
            }
            set
            {
                this._templateName = value;
            }
        }

        public string GridSettings
        {
            get
            {
                return _gridSettings;
            }
            set
            {
                this._gridSettings = value;
            }
        }

        private RequestListTemplate() { }

        public RequestListTemplate(string templateName, string gridSettings)
        {
            this._templateName = templateName;
            this._gridSettings = gridSettings;
        }
    }

    [Serializable]
    public class AssignmentDetailsListTemplate
    {
        private string _gridSettings;
        private string _templateName;

        public string TemplateName
        {
            get
            {
                return _templateName;
            }
            set
            {
                this._templateName = value;
            }
        }

        public string GridSettings
        {
            get
            {
                return _gridSettings;
            }
            set
            {
                this._gridSettings = value;
            }
        }

        private AssignmentDetailsListTemplate() { }

        public AssignmentDetailsListTemplate(string templateName, string gridSettings)
        {
            this._templateName = templateName;
            this._gridSettings = gridSettings;
        }
    }

    [Serializable]
    public class ForecastSettings
    {
        private List<string> _sourceLanguages;
        private List<string> _targetLanguages;
        private string _documentFormat;

        public ForecastSettings() { }

        public List<string> SourceLanguages
        {
            get
            {
                return _sourceLanguages;
            }
            set
            {
                this._sourceLanguages = value;
            }
        }

        public List<string> TargetLanguages
        {
            get
            {
                return _targetLanguages;
            }
            set
            {
                this._targetLanguages = value;
            }
        }

        public string DocumentFormat
        {
            get
            {
                return _documentFormat;
            }
            set
            {
                this._documentFormat = value;
            }
        }

    }

    [Serializable]
    public class CsfSettings
    {
        private List<CsfSetting> _csfSettings;

        public CsfSettings() { }

        public List<CsfSetting> Settings
        {
            get
            {
                return _csfSettings;
            }
            set
            {
                this._csfSettings = value;
            }
        }
    }

    [Serializable]
    public class CsfSetting
    {
        private string _sourceLanguage;
        private string _targetLanguage;
        private string _editor;

        public string SourceLanguage
        {
            get
            {
                return _sourceLanguage;
            }
            set
            {
                _sourceLanguage = value;
            }
        }

        public string TargetLanguage
        {
            get
            {
                return _targetLanguage;
            }
            set
            {
                _targetLanguage = value;
            }
        }

        public string Editor
        {
            get
            {
                return _editor;
            }
            set
            {
                _editor = value;
            }
        }

        public override bool Equals(object obj)
        {
            // If parameter is null return false.
            if (obj == null)
            {
                return false;
            }

            // If parameter cannot be cast to Point return false.
            CsfSetting p = obj as CsfSetting;
            if ((System.Object)p == null)
            {
                return false;
            }

            return (SourceLanguage == p.SourceLanguage) && (TargetLanguage == p.TargetLanguage);
        }

        public static bool operator ==(CsfSetting p1, CsfSetting p2)
        {
            if (System.Object.ReferenceEquals(p1, p2))
            {
                return true;
            }

            // If one is null, but not both, return false.
            if (((object)p1 == null) || ((object)p2 == null))
            {
                return false;
            }
            return ((p1.SourceLanguage == p2.SourceLanguage) && (p1.TargetLanguage == p2.TargetLanguage));
        }

        public static bool operator !=(CsfSetting p1, CsfSetting p2)
        {
            return !(p1 == p2);
        }


        public override int GetHashCode()
        {
            unchecked
            {
                int result = (SourceLanguage != null ? SourceLanguage.GetHashCode() : 0);
                result = (result * 397) ^ (TargetLanguage != null ? TargetLanguage.GetHashCode() : 0);
                return result;
            }
        }
    }

    [Serializable]
    public class PersonalWebSiteSettings
    {
        public string Language { get; set; }

        public string DefaultPassword { get; set; }

        public int FromYear { get; set; }

        public Byte[] Picture { get; set; }

        public bool UseMyOwnFileNamingConvention { get; set; }

        public PersonalWebSiteSettings() { }

    }

    public class AssignmentDetailsListTemplateKeyedCollection : KeyedCollection<string, AssignmentDetailsListTemplate>
    {
        protected override string GetKeyForItem(AssignmentDetailsListTemplate item)
        {
            return item.TemplateName;
        }
    }
    ///// <summary>
    ///// 
    ///// </summary>
    //public class ColumnKeyedCollection : KeyedCollection<string, string>
    //{
    //    protected override string GetKeyForItem(string column)
    //    {
    //        return column;
    //    }

    //    public ColumnKeyedCollection(IEnumerable<string> columns)
    //    {
    //        foreach (string s in columns)
    //        {
    //            this.Add(s);
    //        }
    //    }

    //    public ColumnKeyedCollection()
    //    {
    //    }
    //}

    //public class ProfileGroupPersonal  : ProfileGroupBase
    //{
    //    public string FirstName
    //    {
    //        get { return (string)base.GetPropertyValue("FirstName"); }
    //        set { base.SetPropertyValue("FirstName", value); }
    //    }

    //    public string LastName
    //    {
    //        get { return (string)base.GetPropertyValue("LastName"); }
    //        set { base.SetPropertyValue("LastName", value); }
    //    }

    //    public string Language
    //    {
    //        get { return (string)base.GetPropertyValue("Language"); }
    //        set { base.SetPropertyValue("Language", value); }
    //    }

    //    public string Phone
    //    {
    //        get { return (string)base.GetPropertyValue("Phone"); }
    //        set { base.SetPropertyValue("Phone", value); }
    //    }
    //}

    //public class ProfileGroupSettings : ProfileGroupBase
    //{
    //    public string Theme
    //    {
    //        get { return (string)base.GetPropertyValue("Theme"); }
    //        set { base.SetPropertyValue("Theme", value); }
    //    }

    //    public string[] RequestTemplate
    //    {
    //        get { return (string[])base.GetPropertyValue("RequestTemplate"); }
    //        set { base.SetPropertyValue("RequestTemplate", value); }
    //    }
    //}
}
