FROM ubuntu:focal as base

ENV CCACHE_DIR=/ccache
USER root

#install runtime dependencies
COPY scripts /tmp/example-app/scripts
COPY ostis-web-platform/scripts /tmp/example-app/ostis-web-platform/scripts
COPY ostis-web-platform/sc-machine/scripts /tmp/example-app/ostis-web-platform/sc-machine/scripts
COPY ostis-web-platform/sc-machine/requirements.txt /tmp/example-app/ostis-web-platform/sc-machine/requirements.txt

# tini is an init system to forward interrupt signals properly
RUN apt update && apt install -y --no-install-recommends sudo tini && \
    /tmp/example-app/ostis-web-platform/sc-machine/scripts/install_deps_ubuntu.sh

#build using ccache
FROM base as devdeps
RUN /tmp/example-app/ostis-web-platform/sc-machine/scripts/install_deps_ubuntu.sh --dev

FROM devdeps as devcontainer
RUN apt install -y --no-install-recommends git cppcheck valgrind gdb bash-completion ninja-build curl
ENTRYPOINT ["/bin/bash"]

FROM devdeps as builder
WORKDIR /example-app
COPY . .
RUN --mount=type=cache,target=/ccache/ ./scripts/build_problem_solver.sh -r

#Gathering all artifacts together
FROM base AS final

COPY --from=builder /example-app/ostis-web-platform/sc-machine/scripts /example-app/ostis-web-platform/sc-machine/scripts
COPY --from=builder /example-app/ostis-example-app.ini /example-app/ostis-example-app.ini
COPY --from=builder /example-app/bin /example-app/bin
WORKDIR /example-app

EXPOSE 8090

ENTRYPOINT ["/usr/bin/tini", "--", "/example-app/ostis-web-platform/sc-machine/scripts/docker_entrypoint.sh"]
