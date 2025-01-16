using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace foodRecipe.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] AuctionUser user)
        {
            if (await _context.AuctionUsers.AnyAsync(u => u.email == user.email))
            {
                return BadRequest("User with this email already exists.");
            }

            _context.AuctionUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { UserId = user.userid });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuctionUser loginRequest)
        {
            var user = await _context.AuctionUsers
                .FirstOrDefaultAsync(u => u.email == loginRequest.email && u.password == loginRequest.password && u.usertype == loginRequest.usertype);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(new { UserId = user.userid });
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.AuctionUsers.ToListAsync();
            return Ok(users);
        }


        [HttpPost("createAuction")]
        public async Task<IActionResult> AddAuction([FromBody] AuctionCreateRequest request)
        {
            var auction = new Auction
            {
                sellerid = request.sellerid,
                item = request.item,
                baseprice = request.baseprice,
                explanation = request.explanation,
                imagebase64 = request.imagebase64,
                status = "1" 
            };

            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();
            return Ok(new { AuctionId = auction.auctionid });
        }



        [HttpGet("auction/{id}")]
        public async Task<IActionResult> GetAuctionById(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null)
            {
                return NotFound("auction not found.");
            }
            return Ok(auction);
        }

        [HttpGet("allauctions")]
        public async Task<IActionResult> GetAllAuctions()
        {
            var auction = await _context.Auctions.ToListAsync();
            return Ok(auction);
        }


        [HttpPost("makebid")]
        public async Task<IActionResult> CreateBooking([FromBody] Bid bid)
        {
            _context.Bids.Add(bid);

            await _context.SaveChangesAsync();
            return Ok(new { biddingid = bid.bidid });
        }


        [HttpGet("bids/{auctionId}")]
        public async Task<IActionResult> GetBidsUnderAuction(int auctionId)
        {
            var bids = await _context.Bids
                .Where(b => b.auctionid == auctionId)
                .Select(b => new
                {
                    b.bidid,
                    b.auctionid,
                    b.biddermail,
                    b.phone,
                    b.address,
                    b.bidamnt
                }).ToListAsync();

            if (bids == null || !bids.Any())
            {
                return NotFound("No bids found for this auction.");
            }

            return Ok(bids);
        }


        [HttpGet("liveAuctions")]
        public async Task<IActionResult> GetAuctionsWithStatus1()
        {
            var auctions = await _context.Auctions
                .Where(a => a.status == "1")
                .ToListAsync();

            return Ok(auctions);
        }

        [HttpGet("pastAuctions")]
        public async Task<IActionResult> PastAuctions()
        {
            var auctions = await _context.Auctions
                .Where(a => a.status == "2")
                .ToListAsync();

            return Ok(auctions);
        }

        [HttpPut("endAuction/{auctionId}")]
        public async Task<IActionResult> ChangeAuctionStatusTo2(int auctionId)
        {
            var auction = await _context.Auctions.FindAsync(auctionId);
            if (auction == null)
            {
                return NotFound("Auction not found.");
            }

            auction.status = "2";
            await _context.SaveChangesAsync();

            return Ok(new { Message = "Auction status updated to 2." });
        }

        [HttpPost("Add Auction")]
        public async Task<IActionResult> AddAuction([FromBody] Auction auction)
        {
            _context.Auctions.Add(auction);
            await _context.SaveChangesAsync();
            return Ok(auction);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAuction(int id, [FromBody] Auction auction)
        {
            var existingAuction = await _context.Auctions.FindAsync(id);
            if (existingAuction == null)
            {
                return NotFound();
            }

            // Update fields
            existingAuction.sellerid = auction.sellerid;
            existingAuction.item = auction.item;
            existingAuction.baseprice = auction.baseprice;
            existingAuction.explanation = auction.explanation;
            existingAuction.imagebase64 = auction.imagebase64;
            existingAuction.status = auction.status;

            await _context.SaveChangesAsync();
            return Ok(existingAuction);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAuction(int id)
        {
            var auction = await _context.Auctions.FindAsync(id);
            if (auction == null)
            {
                return NotFound();
            }

            _context.Auctions.Remove(auction);
            await _context.SaveChangesAsync();
            return Ok();
        }

    }



}
