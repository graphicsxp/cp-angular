// <copyright file="EcdtRequestList.cs" company="Translation Centre for the Bodies of the European Union">
//  Copyright (c) 2013 All Rights Reserved
// </copyright>

using System;
using System.Linq;
using System.Runtime.Serialization;

namespace ClientPortal.Dto
{
    [DataContract]
    public class EcdtRequestList
    {
        /// <summary>
        /// Gets or sets the request id.
        /// </summary>
        /// <value>The request id.</value>
        [DataMember]
        public string RequestIdentifier { get; set; }

        [DataMember]
        public DateTime? CreationDate { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public string OriginalFormats { get; set; }

        [DataMember]
        public string ServicesAndVolumes { get; set; }

        [DataMember]
        public string SourceLanguages { get; set; }

        [DataMember]
        public string TargetLanguages { get; set; }

        [DataMember]
        public int NumberOfDocuments { get; set; }

        [DataMember]
        public DateTime? Deadline { get; set; }

        [DataMember]
        public string Confidentiality { get; set; }

        [DataMember]
        public string Purpose { get; set; }

        [DataMember]
        public string Status { get; set; }

        [DataMember]
        public string Department { get; set; }

        [DataMember]
        public int DepartmentId { get; set; }

        [DataMember]
        public string ClientReference { get; set; }

        [DataMember]
        public Guid RequestId { get; set; }
        [DataMember]
        public string Client { get; set; }
    }
}
