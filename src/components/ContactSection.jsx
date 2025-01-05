const ContactSection = () => {
    return (
      <article className="pagePadding my-20">
        <h2 className="text-[3em] font-semibold text-customRed">Contact</h2>
        <section className="mt-4 flex items-center justify-between gap-8 tab:gap-2 mobile:gap-6 px-10 tab:px-0 mobile:flex-col mobile:items-start ">
          <div className="flex w-[50%] mobile:w-full flex-col gap-4">
            <h4 className="font-bold text-softBlue">Get In Touch</h4>
            <p className="text-gray-500">
              If you have any questions or comments, please don’t hesitate to
              reach out to us using the form below. We’re always eager to hear
              from you, whether it’s feedback, inquiries about joining the
              society, collaboration opportunities, or just a friendly
              discussion. You can also follow us on social media for updates,
              event announcements, and a glimpse behind the scenes. We look
              forward to connecting with you!
            </p>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <i className="bi bi-mailbox2"></i>
                <a href="mailto:">lsudsdemo@gmail.com</a>
              </div>
              <div className="flex gap-2">
                <i className="bi bi-telephone-fill"></i>
                <a href="tel:+">07042932301</a>
              </div>
            </div>
          </div>
          <form className="flex w-[50%] mobile:w-full flex-col gap-4">
            <input
              className="inputField h-[60px]"
              type="text"
              required
              placeholder="Full Name"
            />
            <input
              className="inputField h-[60px]"
              type="email"
              required
              placeholder="Email Address"
            />
            <textarea
              className="inputField h-[120px] py-2"
              required
              placeholder="Message"
            ></textarea>
            <div className="mx-auto w-[90%] mobile:w-full">
              <input
                className="cursor-pointer rounded-md bg-softBlue px-8 py-2 text-white"
                type="submit"
                value="Submit"
              />
            </div>
          </form>
        </section>
      </article>
    );
}



export default ContactSection