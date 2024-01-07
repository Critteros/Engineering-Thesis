@Controller("ipxe")
@ApiTags("ipxe")
export class IpxeAssetController {
  constructor(private readonly ipxeAssetService: IpxeAssetService) {}

  @Post("upload")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    description: "List of uploaded files",
    type: FilesUploadDto,
  })
  @RequirePermission("ipxeAssets.create")
  @UseInterceptors(FilesInterceptor("files"))
  async uploadAssets(@UploadedFiles() files: Array<Express.Multer.File>) {
    const results = await this.ipxeAssetService.storeFiles(files);
    return results.map(({ resourceId }) => {
      return this.ipxeAssetService.resolveAssetURL({ resourceId });
    });
  }

  @Get("assets/:path([a-zA-Z0-9-_./]+)")
  @MapErrors({
    if: FileNotFoundError,
    then: (error: Error) => new NotFoundException(error.message),
  })
  @PublicHandler()
  async getAsset(
    @Res({ passthrough: true }) response: Response,
    @Param("path") resource: string
  ) {
    const { stream, filename } = await this.ipxeAssetService.getFileReadStream({
      resourceId: resource,
    });
    response.setHeader(
      "Content-Disposition",
      `attachment; filename="${filename}"`
    );
    return new StreamableFile(stream);
  }
}
