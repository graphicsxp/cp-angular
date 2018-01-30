namespace ClientPortal.Helpers.Enum
{
    /// <summary>
    /// Type of wizard action
    /// </summary>
    public enum WizardAction
    {
        /// <summary>
        /// cancel
        /// </summary>
        Cancel,
        /// <summary>
        /// save request and mark to send
        /// </summary>
        SaveAndMark,
        /// <summary>
        /// save request as draft
        /// </summary>
        SaveAsDraft,
        /// <summary>
        /// send request to cdt
        /// </summary>
        Send
    }

    /// <summary>
    /// Requestdisplay type
    /// </summary>
    public enum RequestDisplayType
    {
        /// <summary>
        /// Template display
        /// </summary>
        Template,
        /// <summary>
        /// Simple request display
        /// </summary>
        Simple,
        /// <summary>
        ///  Multipart request display
        /// </summary>
        MultiPart,
        /// <summary>
        /// 
        /// </summary>
        NewVersion
    }

    /// <summary>
    /// Request Details Display type
    /// </summary>
    public enum RequestDetailsDisplayMode
    {
        /// <summary>
        /// Simple request display
        /// </summary>
        Request,
        /// <summary>
        /// Template display
        /// </summary>
        Template,
        /// <summary>
        /// 
        /// </summary>
        RequestSummary,
        /// <summary>
        /// 
        /// </summary>
        TemplateSummary
    }

    /// <summary>
    /// Notification type for message
    /// </summary>
    public enum NotificationType
    {
        /// <summary>
        /// Success notification
        /// </summary>
        Success,
        /// <summary>
        /// Information notification
        /// </summary>
        Information,
        /// <summary>
        /// Error notification
        /// </summary>
        Error
    }
}
