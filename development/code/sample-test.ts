it("resolves multiple computers", async () => {
  await manager.login(user);

  await prismaService.computer.createMany({
    data: [
      {
        name: "computer-1",
        mac: "00:00:00:00:00:00",
      },
      {
        name: "computer-2",
        mac: "00:00:00:00:00:01",
      },
    ],
  });

  const query = gql`
    query {
      computers {
        name
        mac
      }
    }
  `;

  const { data } = await manager.gql.query(query).expectNoErrors();
  expect(data).toMatchObject({
    computers: [
      {
        name: "computer-1",
        mac: "00:00:00:00:00:00",
      },
      {
        name: "computer-2",
        mac: "00:00:00:00:00:01",
      },
    ],
  });
});
