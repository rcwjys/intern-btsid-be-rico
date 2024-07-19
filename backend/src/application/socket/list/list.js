export function createList(socket) {
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

    } catch (err) {
      console.log(err);
      socket.emit('error', 'An error occured');
    }
  });
}