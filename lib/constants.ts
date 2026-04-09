export type EventItem = {
    image: string;
    title: string;
    slug: string;
    location: string;
    date: string; // e.g., "2025-11-07"
    time: string; // e.g., "09:00 AM"
};

export const events: EventItem[] = [
    {image:'/images/img_adoptbanner.jpg',title:'Adopt 1',slug:'event-dog-1',location:'event-dog-1',date:'Date-1',time:'Time-1'},
    {image:'/images/img_octdog.jpg',title:'Adopt 2',slug:'event-dog-2',location:'event-dog-1',date:'Date-1',time:'Time-1'},
    // {image:'/images/img_octdog.jpg',title:'Adopt 3',slug:'event-dog-3',location:'event-dog-1',date:'Date-1',time:'Time-1'},
]


export const advancedOperationsMetrics = {
    Occupancy_Rate: 98,
    Intake_Number: 8,
    Release_Rate: 12,
    Avg_Length_Of_Stay: '8.5yrs',
    Adoption_Number: 3,
    Return_To_Owner_Rate: 40,
}
