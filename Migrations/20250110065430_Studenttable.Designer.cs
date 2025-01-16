﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using foodRecipe;

#nullable disable

namespace auction.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20250110065430_Studenttable")]
    partial class Studenttable
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("foodRecipe.Auction", b =>
                {
                    b.Property<int>("auctionid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("auctionid"));

                    b.Property<string>("baseprice")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("explanation")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("imagebase64")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("item")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("sellerid")
                        .HasColumnType("int");

                    b.Property<string>("status")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("auctionid");

                    b.ToTable("Auctions");
                });

            modelBuilder.Entity("foodRecipe.AuctionUser", b =>
                {
                    b.Property<int>("userid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userid"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("password")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("usertype")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("userid");

                    b.ToTable("AuctionUsers");
                });

            modelBuilder.Entity("foodRecipe.Bid", b =>
                {
                    b.Property<int>("bidid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("bidid"));

                    b.Property<string>("address")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("auctionid")
                        .HasColumnType("int");

                    b.Property<string>("bidamnt")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("biddermail")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("phone")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("bidid");

                    b.ToTable("Bids");
                });

            modelBuilder.Entity("foodRecipe.Course", b =>
                {
                    b.Property<int>("Courseid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Courseid"));

                    b.Property<string>("description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("title")
                        .HasColumnType("int");

                    b.HasKey("Courseid");

                    b.ToTable("Course");
                });

            modelBuilder.Entity("foodRecipe.Enrollment", b =>
                {
                    b.Property<int>("Enrollmentid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Enrollmentid"));

                    b.Property<string>("Courseid")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("enrollmentdate")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("userid")
                        .HasColumnType("int");

                    b.HasKey("Enrollmentid");

                    b.ToTable("Enrollment");
                });

            modelBuilder.Entity("foodRecipe.Student", b =>
                {
                    b.Property<int>("userid")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("userid"));

                    b.Property<string>("email")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("name")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("userid");

                    b.ToTable("Student");
                });
#pragma warning restore 612, 618
        }
    }
}
