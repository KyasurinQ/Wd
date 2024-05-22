using System.ComponentModel.DataAnnotations.Schema;
using WebTeam.Data.Migrations;

namespace WebTeam.Data
{
    [Table("FeedBack")]
    public partial class FeedBack
    {
        public int FeedBackID { get; set; }

        public string? Content { get; set; }

        public DateTime SentDate { get; set; }

        public string? Marketing_coordinatorID { get; set; }

        public int? SubmissionID { get; set; }

        [ForeignKey("Marketing_coordinatorID")]
        public virtual ApplicationUser? Marketing_coordinator { get; set; }

        [ForeignKey("SubmissionID")]
        public virtual Submission? Submission { get; set; }
    }
}
