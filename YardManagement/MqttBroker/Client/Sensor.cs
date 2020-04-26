using MqttBroker.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Mqtt.Client.AspNetCore.Client
{
    public class Sensor
    {
        private yard_management_dbContext _context;

        public Sensor(yard_management_dbContext context)
        {
           
            _context = context;
        }
        public void AddSensorData(string topic, string value)
        {
            SensorData data = new SensorData();
            data.Payload = value;
            data.Topic = topic;
            data.TimeStamp = DateTime.UtcNow;
            //_context.SensorData.Add({

            //})
            _context.SensorData.Add(data);
            _context.SaveChanges();
        }
    }
}
