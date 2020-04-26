using MqttBroker.Models;
using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Mqtt.Client.AspNetCore.Client
{
    public class AspMqttClient : IAspMqttClient
    {
        private readonly IMqttClientOptions Options;

        private IMqttClient client;

        private yard_management_dbContext _context;

        public AspMqttClient(IMqttClientOptions options)
        {
            Options = options;
            client = new MqttFactory().CreateMqttClient();
            client.UseApplicationMessageReceivedHandler(OnMessage);
            _context = new yard_management_dbContext();
        }

        public virtual void OnMessage(MqttApplicationMessageReceivedEventArgs eventArgs)
        {
            _context.SensorData.Add(new SensorData
            {
                Payload = Encoding.UTF8.GetString(eventArgs.ApplicationMessage.Payload),
                Topic = eventArgs.ApplicationMessage.Topic,
                TimeStamp = DateTime.UtcNow
            });
            _context.SaveChanges();
        }

        public async Task StartClientAsync()
        {
            await client.ConnectAsync(Options);
            System.Diagnostics.Debug.WriteLine("Client is connected");
            await client.SubscribeAsync(new TopicFilterBuilder().WithTopic("#").Build());
            //await client.SubscribeAsync("hello/world");
            System.Diagnostics.Debug.WriteLine("Subscribed on a channel");
            if(!client.IsConnected)
            {
                await client.ReconnectAsync();
            }
        }

        public Task StopClientAsync()
        {
            throw new System.NotImplementedException();
        }
    }
}
