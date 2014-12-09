using oMart.Core.Interface;
using oMart.Core.Models;
using oMart.UI.aspect;
using PostSharp.Aspects;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace oMart.UI
{
    [Serializable]
    public class TraceMethod : OnMethodBoundaryAspect
    {
        private string _fullname;


        //Add a way to validate if method is static, abstract, sealed and exit if not or process with the rest of the method is so
        //public override bool CompileTimeValidate(System.Reflection.MethodBase method)
        //{
        //    return method.IsStatic;
        //}

        public override void CompileTimeInitialize(System.Reflection.MethodBase method, AspectInfo aspectInfo)
        {
            _fullname = string.Format("Full Name : {0}.{1}", method.DeclaringType.Name, method.Name);
        }
        public override void OnEntry(MethodExecutionArgs args)
        {
            
            var LogDetail = new StringBuilder();
            LogDetail.AppendLine();
            LogDetail.AppendLine(string.Format(" {0} ", args.Method.Name));

            foreach (var argument in args.Arguments)
            {
                var argType = argument.GetType();

                LogDetail.Append(argType.Name + ": ");

                if (argType == typeof(string) || argType.IsPrimitive)
                {
                    LogDetail.Append(argument);
                }
                else
                {
                    foreach (var property in argType.GetProperties())
                    {
                        LogDetail.AppendFormat("{0} = {1}; ",
                            property.Name, property.GetValue(argument, null));
                    }
                }
            }
            
            omartLogger.SaveLog(args.Method.Name, LogDetail);
        }

        public override void OnExit(MethodExecutionArgs args)
        {
            //Trace.WriteLine(string.Format("Exiting : {0}.{1} - {2}",
            //    args.Method.DeclaringType.Name, args.Method.Name, DateTime.Now));
        }
    }
}
