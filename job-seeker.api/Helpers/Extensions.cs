using Microsoft.AspNetCore.Http;

namespace job_seeker.api.Helpers
{
    public static class Extensions
    {
        // Server side exception handling
        public static void AddApplicationError(this HttpResponse response, string message)
        {
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Access-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Access-Control-Allow-Origin", "*");

            // Logging code will be here
        }       


        // Logging code will come here
    
    
    
     } 
}