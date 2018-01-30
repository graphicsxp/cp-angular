//using System;
//using Telerik.Web.UI;

//namespace ClientPortal.Helpers
//{
//    public class AppointmentInfo
//    {
//        public string ID
//        {
//            get;
//            set;
//        }
//        public string Subject
//        {
//            get;
//            set;
//        }
//        public DateTime Start
//        {
//            get;
//            set;
//        }
//        public DateTime End
//        {
//            get;
//            set;
//        }
//        public string RecurrenceRule
//        {
//            get;
//            set;
//        }
//        public string RecurrenceParentID
//        {
//            get;
//            set;
//        }

//        public string Description
//        {
//            get;
//            set;
//        }

//        public int AppointmentTypeId
//        {
//            get;
//            set;
//        }
//        public int RequestId
//        {
//            get;
//            set;
//        }

//        public string RequestIdentifierEcdt { get; set; }
//        public Guid RequestIdEcdt { get; set; }
//        public string StatusCode { get; set; }

//        public AppointmentInfo()
//        {
//            this.ID = Guid.NewGuid().ToString();
//        }

//        public AppointmentInfo(string subject, DateTime start, DateTime end)
//            : this()
//        {
//            this.Subject = subject;
//            this.Start = start;
//            this.End = end;
//        }
//        public AppointmentInfo(Appointment source)
//            : this()
//        {
//            CopyInfo(source);
//        }
//        public void CopyInfo(Appointment source)
//        {
//            Subject = source.Subject;
//            Start = source.Start;
//            End = source.End;
//            Description = source.Description;
//            Resource r = source.Resources.GetResourceByType("AppointmentType");
//            if (r != null)
//                AppointmentTypeId = (int)r.Key;
//        }
//    }
//}
