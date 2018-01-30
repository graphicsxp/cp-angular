using System.Web.UI.WebControls;

public static class WizardExtensions
{
    /// <summary>
    /// return css class for a wizard step
    /// </summary>
    /// <param name="wizardStep"></param>
    /// <returns></returns>
    public static string GetClassForWizardStep(this Wizard wizard, WizardStep wizardStep)
    {
        if (wizardStep == null)
        {
            return string.Empty;
        }

        int stepIndex = wizard.WizardSteps.IndexOf(wizardStep);

        if (stepIndex < wizard.ActiveStepIndex)
        {
            return "stepCompleted";
        }
        else if (stepIndex > wizard.ActiveStepIndex)
        {
            return "stepNotCompleted";
        }
        else
        {
            return "stepCurrent";
        }
    }
}