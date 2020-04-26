using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace MqttBroker.Models
{
    public partial class yard_management_dbContext : DbContext
    {
        public yard_management_dbContext()
        {
        }

        public yard_management_dbContext(DbContextOptions<yard_management_dbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SensorData> SensorData { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=.;Database=yard_management_db;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SensorData>(entity =>
            {
                entity.ToTable("sensor_data");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Payload)
                    .HasColumnName("payload")
                    .IsUnicode(false);

                entity.Property(e => e.TimeStamp)
                    .HasColumnName("time_stamp")
                    .HasColumnType("datetime");

                entity.Property(e => e.Topic)
                    .IsRequired()
                    .HasColumnName("topic")
                    .HasMaxLength(255)
                    .IsUnicode(false);
            });
        }
    }
}
