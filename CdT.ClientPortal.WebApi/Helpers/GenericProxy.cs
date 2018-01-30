using System.ServiceModel;

namespace ClientPortal.Helpers
{
    /// <summary>
    /// Generic class for wcf client
    /// </summary>
    public class GenericProxy<T> : ClientBase<T> where T : class
    {
        public GenericProxy(string endpointName)
            : base(endpointName)
        {
        }

        public T Proxy
        {
            get
            {
                return this.Channel;
            }
        }
    }
}

