using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.EntityFrameworkCore.Migrations;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace foodRecipe
{
    public class AuctionUser
    {
        [JsonIgnore]
        [Key]
        public int userid { get; set; }
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }


    public class LoginRequest
    {
        public string usertype { get; set; }

        public string email { get; set; }

        public string password { get; set; }
    }

    public class Auction
    {
        [Key]
        public int auctionid { get; set; }
        public int sellerid { get; set; }
        public string item { get; set; }
        public string baseprice { get; set; }
        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Store the image as a base64 string
        public string status { get; set; }


    }


    public class AuctionCreateRequest
    {

        public int sellerid { get; set; }
        public string item { get; set; }
        public string baseprice { get; set; }
        public string explanation { get; set; }
        public string imagebase64 { get; set; } // Base64 encoded image string }


    }

    public class Bid
    {
        [JsonIgnore]
        [Key]
        public int bidid { get; set; } // Primary key, auto-increment
        public int auctionid { get; set; }
        public string biddermail { get; set; }
        public string phone { get; set; }
        public string address { get; set; }
        public string bidamnt { get; set; }


    }

    public class Student
    {
        [JsonIgnore]
        [Key]
        public int userid { get; set; }
        public string name { get; set; }

        public string email { get; set; }


    }

    public class Course
    {
        [JsonIgnore]
        [Key]
        public int Courseid { get; set; } // Primary key, auto-increment
        public int title { get; set; }
        public string description { get; set; }
       


    }

    public class Enrollment
    {
        [JsonIgnore]
        [Key]
        public int Enrollmentid { get; set; } // Primary key, auto-increment
        public int userid { get; set; }
        public string Courseid { get; set; }
        public string enrollmentdate { get; set; }
       


    }

}