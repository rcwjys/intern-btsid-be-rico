export async function createList(socket, next) {
  socket.on('createList', async (data) => {
    const { listId } = data;

    try {
      const createdList = await prisma.list.findUnique({
        where: {
          list_id: listId
        }
      });

      const formattedResponse = {
        listId: createdList.list_id,
        listTitle: createdList.list_title
      }

      io.to(boardId).emit('createdList', formattedResponse );

      next()

    } catch (err) {
      console.log(err);
      socket.emit('error', 'An error occured');
      next()
    }
  });
}