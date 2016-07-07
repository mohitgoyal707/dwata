import falcon
from wsgiref import simple_server

import settings
from handlers.static import HomepageHandler, assets_handler
# from handlers.source import SourceHandler
# from handlers.schema import SchemaHandler


api = falcon.API()

api.add_route('/', HomepageHandler())
api.add_sink(assets_handler, prefix=r'/asset/')
# api.add_route('/source/', SourceHandler())

# api.add_route('/schema/', SchemaHandler())
# api.add_route('/schema/alter/', )
#
# api.add_route('/op/select/', )
# api.add_route('/op/insert/', )
# api.add_route('/op/update/', )
# api.add_route('/op/delete/', )


if __name__ == '__main__':
    httpd = simple_server.make_server(settings.SERVER_HOST, settings.SERVER_PORT, api)
    httpd.serve_forever()