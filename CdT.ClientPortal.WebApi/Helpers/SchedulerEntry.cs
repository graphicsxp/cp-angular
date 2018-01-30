//using System;
//using Telerik.Web.UI;

//namespace ClientPortal.Helpers
//{
//    public class SchedulerEntry
//    {
//        private readonly string _id;
//        private DateTime _end;
//        private string _recurrenceParentId;
//        private string _recurrenceRule;
//        private DateTime _start;
//        private string _subject;
//        private int? _userID;

//        public SchedulerEntry(Appointment source): this()
//        {
//            CopyInfo(source);
//        }

//        public SchedulerEntry(string subject, DateTime start, DateTime end,string recurrenceRule, string recurrenceParentID, int? userID)
//        : this()
//        {
//            _subject = subject;
//            _start = start;
//            _end = end;
//            _recurrenceRule = recurrenceRule;
//            _recurrenceParentId = recurrenceParentID;
//            _userID = userID;
//        }

//        private SchedulerEntry()
//        {
//            _id = Guid.NewGuid().ToString();
//        }

//        public DateTime End
//        {
//            get
//            {
//                return _end;
//            }
//            set
//            {
//                _end = value;
//            }
//        }

//        public string ID
//        {
//            get
//            {
//                return _id;
//            }
//        }

//        public string RecurrenceParentID
//        {
//            get
//            {
//                return _recurrenceParentId;
//            }
//            set
//            {
//                _recurrenceParentId = value;
//            }
//        }

//        public string RecurrenceRule
//        {
//            get
//            {
//                return _recurrenceRule;
//            }
//            set
//            {
//                _recurrenceRule = value;
//            }
//        }

//        public DateTime Start
//        {
//            get
//            {
//                return _start;
//            }
//            set
//            {
//                _start = value;
//            }
//        }

//        public string Subject
//        {
//            get
//            {
//                return _subject;
//            }
//            set
//            {
//                _subject = value;
//            }
//        }

//        public int? UserID
//        {
//            get
//            {
//                return _userID;
//            }
//            set
//            {
//                _userID = value;
//            }
//        }

//        public void CopyInfo(Appointment source)
//        {
//            Subject = source.Subject;
//            Start = source.Start;
//            End = source.End;
//            RecurrenceRule = source.RecurrenceRule;
//            if (source.RecurrenceParentID != null)
//            {
//                RecurrenceParentID = source.RecurrenceParentID.ToString();
//            }

//            Resource user = source.Resources.GetResourceByType("User");
//            if (user != null)
//            {
//                UserID = (int?)user.Key;
//            }
//            else
//            {
//                UserID = null;
//            }
//        }
//    }
//}

