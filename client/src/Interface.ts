export interface Display {
    background: string;
    text: string;
    font: string
}

export interface Project{
    url: string,
    name: string,
    description: string,
    topics: string[],
    id: string,
    image: string
}

export interface Experience{
    name: string,
    position: string,
    team: string,
    tech: string[]
    from: string,
    to: string,
    background: string,
    display: Display
}

export interface Education{
    name: string,
    degree: string,
    from: string,
    to: string,
    display: Display
}
