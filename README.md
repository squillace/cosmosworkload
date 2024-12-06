# cosmosdb workload identity sample -- DRAFT VERSION

This Spin Framework application uses Azure CosmosDB as a key-value store interchangeably with the local sqlite key-value implementation of Spin. In the case of CosmosDb, you can use https://github.com/devigned/spin-workload-id terraform sample to create the entire Azure infrastructure necessary to deploy this sample application.

For local usage WITH a managed identity, you must create a managed idendity scoped to your cosmosdb with managed identity enabled and assigned the required roles. https://github.com/fermyon/spin/pull/2566#issue-2355334741 has much of the testing details. 
