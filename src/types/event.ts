export interface EventsResponse {
    searchEndDate: string,
    events: EventItem[],
    eventInstances: EventInstance[],
    itineraryRequestSuccess: boolean,
    eventInvitationsRequestSuccess: boolean,
    success: boolean,
}

export interface EventItem {
    id: string,
    path: string,
    artist: string,
    buttonText: string,
    carousel: string,
    cqTags: CQTag[],
    category: string,
    description: string,
    imageLink: string,
    title: string,
    startDate: string,
    endDate: string,
    allDayEvent: boolean,
    dropdown: string,
    displayType: string,
    location: string,
    locationURL: string,
    url: string,
    ongoing: boolean,
    redeemed: boolean,
    invitedEventIds: InvitedEventId[],
}

export interface CQTag {
    key: string,
    value: string
}

export interface InvitedEventId {
    propertyId: string,
    groupType: string,
    groupCode: string,
    functionId: string,
}

export interface EventInstance {
    eventRef: string,
    allDay: boolean,
    start: string,
    end: string,
}