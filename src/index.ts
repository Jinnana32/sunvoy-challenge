const main = async () => {
  console.log('testing');
};

main().catch((err) => {
  console.error('Error:', { err });
  process.exit(1);
});
