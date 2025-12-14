import EventtypeItemComponent from "@/components/eventtypes/EventtypeItemComponent";
import { getEventTypeList } from "@/utils/api-requests";

async function EventtypeListComponent() {
  const eventTypeListData = await getEventTypeList();
  
  return (
    <div className="container mx-auto sm:grid sm:grid-cols-2 xl:grid-cols-3 gap-16 sm:gap-11">
      {eventTypeListData?.data?.map((item, idx) => {
        return (
          <EventtypeItemComponent
            title={item.title}
            description={item.description}
            slug={item.slug}
            imageURL={item.headingImage?.url}
            isEven={!!(idx % 2)}
            key={item.id}
          />
        );
      })}
    </div>
  );
}

export default EventtypeListComponent;
