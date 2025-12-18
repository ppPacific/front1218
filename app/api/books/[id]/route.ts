

export async function DELETE(
    request: Request,
    context: {params: {id: string}}
) {
    const id = +context.params.id;

    const index = books.findIndex((b)=> b.id === id);
    books.splice(index, 1);
    return Response.json(books);
}
