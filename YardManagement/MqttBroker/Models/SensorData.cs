using System;
using System.Collections.Generic;

namespace MqttBroker.Models
{
    public partial class SensorData
    {
        public int Id { get; set; }
        public string Topic { get; set; }
        public string Payload { get; set; }
        public DateTime? TimeStamp { get; set; }
    }
}
