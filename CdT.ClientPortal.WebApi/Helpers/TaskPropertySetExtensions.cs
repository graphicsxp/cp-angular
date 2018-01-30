namespace CdT.EAI.Model.Workflow
{
    public static class TaskPropertySetExtensions
    {
        public static int ActivityIndex(this TaskPropertySet taskPropertySet)
        {
            var index = -1;

            if (taskPropertySet is PreProcessingTaskPropertySet)
            {
                index = 1;
            }
            else if (taskPropertySet is TranslationTaskPropertySet)
            {
                index = 2;
            }
            else if (taskPropertySet is MidProcessingTaskPropertySet)
            {
                index = 3;
            }
            else if (taskPropertySet is QualityControlTaskPropertySet)
            {
                index = 4;
            }
            else if (taskPropertySet is PostProcessingTaskPropertySet)
            {
                index = 5;
            }
            else if (taskPropertySet is DeliveryTaskPropertySet)
            {
                index = 6;
            }

            return index;
        }
    }
}