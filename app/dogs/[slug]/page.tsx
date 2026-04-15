export default function DogDetailPage({
                                          params,
                                      }: {
    params: Promise<{ slug: string }>
}) {
    //const { slug } = await params;
    return <h1>Hello, Dog detail Page!</h1>
}
