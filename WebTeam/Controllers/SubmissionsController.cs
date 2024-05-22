using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using WebTeam.Data;
using WebTeam.Models;

namespace WebTeam.Controllers
{
    public class SubmissionsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SubmissionsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Submissions
        public async Task<IActionResult> Index()
        {
            var submissions = await _context.Submissions.Include(s => s.User).ToListAsync();
            return View(submissions);
        }

        // GET: Submissions/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var submission = await _context.Submissions.Include(s => s.User).FirstOrDefaultAsync(m => m.SubmissionId == id);
            if (submission == null)
            {
                return NotFound();
            }

            return View(submission);
        }

        // GET: Submissions/Create
        public IActionResult Create()
        {
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId");
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("SubmissionId,UserId,SubmissionDate,Status,CommentSubContent,CommentSubDate,CommentFeedbackContent,CommentFeedbackDate,FileSubName,FileUploadDate,AttachmentFileName")] Submission submission, IFormFile file)
        {
            if (ModelState.IsValid)
            {
                if (file != null && file.Length > 0)
                {
                    var fileExtension = Path.GetExtension(file.FileName);
                    if (fileExtension != ".docx")
                    {
                        ModelState.AddModelError("File", "Only .docx files are allowed.");
                        ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId", submission.UserId);
                        return View(submission);
                    }

                    var fileName = Path.GetFileName(file.FileName);
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/Uploads", fileName);
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    submission.FileSubName = fileName;
                    submission.FileUploadDate = DateTime.Now;
                }

                _context.Add(submission);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            ViewData["UserId"] = new SelectList(_context.Users, "UserId", "UserId", submission.UserId);
            return View(submission);
        }

        public IActionResult ShowPdf(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var submission = _context.Submissions.FirstOrDefault(m => m.SubmissionId == id);
            if (submission == null)
            {
                return NotFound();
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", submission.FileSubName);

            var fileExtension = Path.GetExtension(filePath);
            if (fileExtension != ".pdf")
            {
                return BadRequest("Only .pdf files can be shown.");
            }

            return PhysicalFile(filePath, "application/pdf");
        }


        // GET: Submissions/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var submission = await _context.Submissions.FindAsync(id);
            if (submission == null)
            {
                return NotFound();
            }

            // Remove uploaded file from the server
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "Uploads", submission.FileSubName);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }

            _context.Submissions.Remove(submission);
            await _context.SaveChangesAsync();

            return RedirectToAction(nameof(Index));
        }
    }
}
