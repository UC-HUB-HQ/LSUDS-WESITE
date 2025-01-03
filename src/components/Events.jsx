const Events = () => {
    const events = [
        {
          "id": 1,
          "event_name": "Annual Debate Championship 2025",
          "event_date": "2025-03-15",
          "event_paragraph": "The Annual Debate Championship is the highlight of our calendar, bringing together the best debaters from universities across the region. This year, participants will engage in thought-provoking debates on pressing global issues. It's an opportunity to challenge your critical thinking, enhance your public speaking skills, and connect with fellow debate enthusiasts. Don't miss the chance to be part of this intellectually stimulating event!",
          "event_image": "https://images.unsplash.com/photo-1484494789010-20fc1a011197"
        },
        {
          "id": 2,
          "event_name": "Workshop: Mastering the Art of Persuasion",
          "event_date": "2025-02-10",
          "event_paragraph": "This hands-on workshop focuses on mastering the art of persuasion, a critical skill for effective debating. Participants will learn techniques for constructing compelling arguments, countering opposing views, and captivating their audience. Join us for an enriching session led by experienced debate coaches and communication experts.",
          "event_image": "https://images.unsplash.com/photo-1484494789010-20fc1a011197"
        },
        {
          "id": 3,
          "event_name": "Intercollegiate Debate Series: Climate Action Now",
          "event_date": "2025-04-20",
          "event_paragraph": "The Intercollegiate Debate Series is back, and this year's theme is 'Climate Action Now.' Teams from various colleges will debate critical topics such as renewable energy policies, climate justice, and sustainable development. Join us for an engaging series of debates as we explore solutions to one of the most urgent challenges of our time.",
          "event_image": "https://images.unsplash.com/photo-1484494789010-20fc1a011197"
        }
    ]


    const textReducer = (text) => {
        const text_list = text.split(" ")
        if (text_list.length > 11){
            return text_list.splice(0, 11).join(' ')+"..."
        }
        return text;
    }
      
    return (
        <article className="pagePadding tab:px-7 my-8">
            <div>
                <h4 className=" text-softBlue font-bold ">EVENTS</h4>
                <h2 className=" text-[3em] font-semibold">Coming Up</h2>
            </div>
            <section className="flex tab:flex-col flex-row justify-between gap-8 mt-8">
                {events.map((event) => (
                    <div key={event.id} className="">
                        <div className="mb-2">
                            <img className=" h-[250px]" src={event.event_image} alt="event image" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex gap-2">
                                <i className="bi bi-calendar-check text-softBlue"></i>
                                <p className=" text-gray-500">{event.event_date}</p>
                            </div>
                            <h3 className=" text-2xl font-semibold">{event.event_name}</h3>
                            <p className="text-gray-500 font-medium">{textReducer(event.event_paragraph)}</p>
                        </div>
                    </div>
                ))}
            </section>
            <button className=" bg-softBlue text-white px-6 py-2 rounded-md mt-10">See More</button>
        </article>
    )
}


export default Events