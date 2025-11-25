Alert.alert(
    "Cadastro concluído 🎉",
    "Sua conta foi criada com sucesso!",
    [
        {
            text: "Fechar",
            style: "cancel"
        }
    ]
);


const removerProduto = (nome: string) => {
  Alert.alert(
    "Remover item",
    `Deseja remover ${nome} do carrinho?`,
    [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => {
          // lógica para remover
        }
      }
    ]
  );
};

